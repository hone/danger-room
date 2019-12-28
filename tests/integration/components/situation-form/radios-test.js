import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | situation-form/radios', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.clicked = null;
    this.click = (difficulty) => {
      this.clicked = difficulty;
    };
    this.options = ['random', 'standard', 'expert'];
    this.legend = 'Mode';
    this.name = 'difficulty-mode';
  });

  test('it renders', async function(assert) {
    await render(hbs`<SituationForm::Radios @legend={{this.legend}} @name={{this.name}} @options={{this.options}} @chosen=random @action={{this.click}} />`);

    assert.dom('[data-test-parameters-radio-fieldset=difficulty-mode]').hasAttribute('id', 'difficulty-mode');
    assert.dom('[data-test-parameters-radio-legend=difficulty-mode]').hasText('Mode');
    this.options.forEach(difficultyMode => {
      let radioSelector = `[data-test-parameters-radio='difficulty-mode:${difficultyMode}']`;
      assert.dom(radioSelector).hasAttribute('id', `difficulty-mode:${difficultyMode}`);
      assert.dom(radioSelector).hasAttribute('name', 'difficulty-mode');
      let labelSelector = `[data-test-parameters-radio-label='difficulty-mode:${difficultyMode}']`;
      assert.dom(labelSelector).hasText(difficultyMode);
      assert.dom(labelSelector).hasAttribute('for', `difficulty-mode:${difficultyMode}`);
    });
    assert.dom('[data-test-parameters-radio="difficulty-mode:random"]').isChecked();
    ['standard', 'expert'].forEach(difficultyMode => {
      assert.dom(`[data-test-parameters-radio='difficulty-mode:${difficultyMode}']`).isNotChecked();
    });
  });

  test('on click it passes in difficultyMode', async function(assert) {
    await render(hbs`<SituationForm::Radios @legend={{this.legend}} @name={{this.name}} @options={{this.options}} @chosen=random @action={{this.click}} />`);
    await click('[data-test-parameters-radio="difficulty-mode:standard"]');

    assert.equal(this.clicked, "standard");
  });

  test('it renders the chosen option', async function(assert) {
    await render(hbs`<SituationForm::Radios @legend={{this.legend}} @name={{this.name}} @options={{this.options}} @chosen=standard @action={{this.click}} />`);

    assert.dom('[data-test-parameters-radio="difficulty-mode:standard"]').isChecked();
    ['random', 'expert'].forEach(difficultyMode => {
      assert.dom(`[data-test-parameters-radio='difficulty-mode:${difficultyMode}']`).isNotChecked();
    });
  });
});
