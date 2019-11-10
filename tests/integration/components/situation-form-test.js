import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, find, click, render } from '@ember/test-helpers';
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
    assert.notOk(find('[data-test-result-player-hero]'));
    assert.notOk(find('[data-test-result-player-aspect]'));
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
});
