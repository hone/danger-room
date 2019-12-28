import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, find, findAll, click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Data from 'danger-room/data/data';

module('Integration | Component | situation-form', function(hooks) {
  setupRenderingTest(hooks);
  let generated;
  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
    this.store.push(Data);

    this.state = {
      parameters: {
        difficultyMode: "",
        numModularEncounterSets: 1,
        numOfPlayers: 0,
        scenario: "random",
      },
      result: {
        difficultyMode: "",
        modularEncounterSets: [],
        players: [],
        scenario: "",
      },
    };

    this.model = {
      identities: this.store.findAll('identity'),
      modularEncounterSets: this.store.findAll('modular-encounter-set'),
      scenarios: this.store.findAll('scenario'),
    };

    this.action = (state) => {
      generated = state;
    };
  });

  test('it sets default values', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @model={{this.model}} />`);

    assert.ok(find('[data-test-parameters-scenario=random]').selected);
    assert.ok(find("[data-test-parameters-radio='difficulty-mode:random']").checked);
    assert.ok(find("[data-test-parameters-radio='modular-encounter-sets:1']").checked);
    assert.ok(find("[data-test-parameters-radio='num-of-players:0']").checked);
  });

  test('it does not render results on initial render', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @model={{this.model}} />`);

    assert.notOk(find('[data-test-result-scenario]'));
    assert.notOk(find('[data-test-result-player]'));
  });

  test('it renders results from state', async function(assert) {
    this.state = {
      parameters: {
        difficultyMode: "standard",
        numModularEncounterSets: 2,
        numOfPlayers: 2,
        scenario: "1",
      },
      result: {
        difficultyMode: "standard",
        modularEncounterSets: ["bomb_scare", "under_attack"],
        players: [{
          identity: '1',
          aspect: "Justice",
        }],
        scenario: "rhino",
      }
    };
    await render(hbs`<SituationForm @state={{this.state}} @model={{this.model}} />`);

    assert.ok(find('[data-test-parameters-scenario="rhino"]').selected);
    assert.ok(find("[data-test-parameters-radio='difficulty-mode:standard']").checked);
    assert.ok(find('[data-test-parameters-radio="modular-encounter-sets:2"]').checked);
    assert.ok(find('[data-test-parameters-radio="num-of-players:2"]').checked);

    assert.ok(find('[data-test-result-scenario]'));
    assert.ok(find('[data-test-result-player]'));
    assert.dom('[data-test-result-scenario-name]').hasText('Rhino');
    assert.dom('[data-test-result-difficulty-mode]').hasText('standard');
    assert.dom('[data-test-result-modular-encounter-set-name="bomb_scare"]').hasText('Bomb Scare');
    assert.dom('[data-test-result-modular-encounter-set-pack-name="bomb_scare"]').hasText('Core');
    assert.dom('[data-test-result-modular-encounter-set-name="under_attack"]').hasText('Under Attack');
    assert.dom('[data-test-result-modular-encounter-set-pack-name="under_attack"]').hasText('Core');
    assert.dom('[data-test-result-player-hero]').hasText('Spider-Man');
    assert.dom('[data-test-result-player-aspect]').hasText('Justice');
  });

  test('it renders results in generate', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}} @model={{this.model}} />`);
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.ok(find('[data-test-result-scenario]'));
  });

  test('it uses the scenario selected', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}} @model={{this.model}} />`);
    await fillIn('[data-test-parameters-scenario]', '1');
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.equal(generated.result.scenario, 'rhino');
    let text = find('[data-test-result-scenario]').textContent;
    assert.ok(text.includes('Rhino'), `Expected to find 'Rhino', but found: ${text}`);
  });

  test('it generates the number of modular encounter sets', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}} @model={{this.model}} />`);
    await click('[data-test-parameters-radio="modular-encounter-sets:2"]');
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.equal(generated.result.modularEncounterSets.length, 2);
    assert.equal(findAll('[data-test-result-modular-encounter-set]').length, 2);
  });

  test('it uses the difficulty mode picked', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}} @model={{this.model}} />`);
    await click('[data-test-parameters-radio="difficulty-mode:standard"]');
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.equal(generated.result.difficultyMode, "standard");
    assert.dom('[data-test-result-difficulty-mode]').hasText("standard");
  });

  test('it generates player combinations', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}} @model={{this.model}} />`);
    await click('[data-test-parameters-radio="num-of-players:2"]');
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.equal(generated.result.players.length, 2);
    assert.equal(findAll('[data-test-result-player-header]').length, 2);
  });
});
