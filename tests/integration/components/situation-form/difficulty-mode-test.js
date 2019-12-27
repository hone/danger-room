import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | situation-form/difficulty-mode', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.clicked = null;
    this.click = (difficulty) => {
      this.clicked = difficulty;
    };
    this.options = ['random', 'standard', 'expert'];
  });

  test('it renders', async function(assert) {
    await render(hbs`<SituationForm::DifficultyMode @options={{this.options}} @chosen=random @action={{this.click}} />`);

    this.options.forEach(difficultyMode => {
      assert.dom(`[data-test-parameters-difficulty-mode=${difficultyMode}]`).exists();
    });
    assert.dom('[data-test-parameters-difficulty-mode=random]').isChecked();
    ['standard', 'expert'].forEach(difficultyMode => {
      assert.dom(`[data-test-parameters-difficulty-mode=${difficultyMode}]`).isNotChecked();
    });
  });

  test('on click it passes in difficultyMode', async function(assert) {
    await render(hbs`<SituationForm::DifficultyMode @options={{this.options}} @chosen=random @action={{this.click}} />`);
    await click('[data-test-parameters-difficulty-mode=standard]');

    assert.equal(this.clicked, "standard");
  });

  test('it renders the chosen option', async function(assert) {
    await render(hbs`<SituationForm::DifficultyMode @options={{this.options}} @chosen=standard @action={{this.click}} />`);

    assert.dom('[data-test-parameters-difficulty-mode=standard]').isChecked();
    ['random', 'expert'].forEach(difficultyMode => {
      assert.dom(`[data-test-parameters-difficulty-mode=${difficultyMode}]`).isNotChecked();
    });
  });
});
