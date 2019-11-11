import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, find, findAll, click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | situation-form', function(hooks) {
  setupRenderingTest(hooks);
  let generated;
  hooks.beforeEach(function() {
    this.state = {
      parameters: {
        difficultyMode: "",
        numModularEncounterSets: 1,
        numOfPlayers: 0,
        villain: "random",
      },
      result: {
        difficultyMode: "",
        modularEncounterSets: [],
        players: [],
        villain: "",
      },
    };

    this.action = (state) => {
      generated = state;
    };
  });

  test('it does not render results on initial render', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} />`);

    assert.notOk(find('[data-test-result-villain]'));
    assert.notOk(find('[data-test-result-player]'));
  });

  test('it renders results from state', async function(assert) {
    this.state = {
      parameters: {
        difficultyMode: "standard",
        numModularEncounterSets: 2,
        numOfPlayers: 1,
        villain: "random",
      },
      result: {
        difficultyMode: "standard",
        modularEncounterSets: ["bomb_scare", "under_attack"],
        players: [{
          identity: 1,
          aspect: "Justice",
        }],
        villain: "rhino",
      }
    };
    await render(hbs`<SituationForm @state={{this.state}} />`);

    assert.ok(find('[data-test-parameters-villain="random"]').selected);
    assert.ok(find('[data-test-parameters-difficulty-mode="standard"]').checked);
    assert.ok(find('[data-test-parameters-modular-encounter-sets="2"]').checked);
    assert.ok(find('[data-test-parameters-num-of-players="1"]').checked);

    assert.ok(find('[data-test-result-villain]'));
    assert.ok(find('[data-test-result-player]'));
    assert.equal(find('[data-test-result-villain-name]').textContent, 'Rhino');
    assert.equal(find('[data-test-result-difficulty-mode]').textContent, 'standard');
    assert.equal(find('[data-test-result-modular-encounter-set-name="bomb_scare"]').textContent, 'Bomb Scare');
    assert.equal(find('[data-test-result-modular-encounter-set-name="under_attack"]').textContent, 'Under Attack');
    assert.equal(find('[data-test-result-player-hero]').textContent, 'Spider-Man');
    assert.equal(find('[data-test-result-player-aspect]').textContent, 'Justice');
  });

  test('it renders results in generate', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}}/>`);
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.ok(find('[data-test-result-villain]'));
  });

  test('it uses the villain selected', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}}/>`);
    await fillIn('[data-test-parameters-villain]', '1');
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.equal(generated.result.villain, 'rhino');
    let text = find('[data-test-result-villain]').textContent;
    assert.ok(text.includes('Rhino'), `Expected to find 'Rhino', but found: ${text}`);
  });

  test('it generates the number of modular encounter sets', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}}/>`);
    await click('[data-test-parameters-modular-encounter-sets="2"]');
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.equal(generated.result.modularEncounterSets.length, 2);
    assert.equal(findAll('[data-test-result-modular-encounter-set]').length, 2);
  });

  test('it uses the difficulty mode picked', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}}/>`);
    await click('[data-test-parameters-difficulty-mode="standard"]');
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.equal(generated.result.difficultyMode, "standard");
    assert.equal(find('[data-test-result-difficulty-mode]').textContent, "standard");
  });

  test('it generates player combinations', async function(assert) {
    await render(hbs`<SituationForm @state={{this.state}} @submit={{this.action}}/>`);
    await click('[data-test-parameters-num-of-players="2"]');
    await click('[data-test-generate]');

    assert.ok(generated);
    assert.equal(generated.result.players.length, 2);
    assert.equal(findAll('[data-test-result-player-header]').length, 2);
  });
});
