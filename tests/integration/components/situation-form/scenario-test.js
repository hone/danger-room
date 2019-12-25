import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Data from 'danger-room/data/data';

module('Integration | Component | situation-form/scenario', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
    this.store.push(Data);
    this.scenarios = this.store.findAll('scenario');
  });

  test('it renders and by default selects random', async function(assert) {
    await render(hbs`<SituationForm::Scenario @chosen="random" @scenarios={{this.scenarios}} />`);

    assert.dom('[data-test-parameters-scenario=random]').exists();
    this.scenarios.toArray().forEach(scenario => {
      assert.dom(`[data-test-parameters-scenario=${scenario.slug}]`).exists();
    });

    assert.ok(find('[data-test-parameters-scenario=random]').selected);
  });

  test('it renders and selects the chosen scenario', async function(assert) {
    await render(hbs`<SituationForm::Scenario @chosen=1 @scenarios={{this.scenarios}} />`);

    assert.dom('[data-test-parameters-scenario=random]').exists();
    this.scenarios.toArray().forEach(scenario => {
      assert.dom(`[data-test-parameters-scenario=${scenario.slug}]`).exists();
    });
    
    assert.ok(find('[data-test-parameters-scenario=rhino]').selected);
  });
});
