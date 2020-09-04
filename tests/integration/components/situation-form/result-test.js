import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Data from 'danger-room/data/data';

module('Integration | Component | situation-form/result', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.store = this.owner.lookup('service:store');
    this.store.push(Data);

    this.modularEncounterSet = this.store
      .peekAll('modular-encounter-set')
      .toArray()[0];
    this.identity = this.store.peekAll('identity').toArray()[0];
    this.result = {
      scenario: this.store.peekAll('scenario').toArray()[0],
      difficultyMode: 'expert',
      modularEncounterSets: [this.modularEncounterSet],
      players: [
        {
          identity: this.identity,
          aspects: ['Aggression'],
        },
      ],
    };
  });

  test('it renders', async function(assert) {
    await render(hbs`<SituationForm::Result @result={{this.result}} />`);

    assert
      .dom('[data-test-result-scenario-name]')
      .hasText(this.result.scenario.name);
    assert
      .dom('[data-test-result-difficulty-mode]')
      .hasText(this.result.difficultyMode);
    assert
      .dom(
        `[data-test-result-modular-encounter-set-name=${this.modularEncounterSet.slug}]`
      )
      .hasText(this.modularEncounterSet.name);
    assert
      .dom(
        `[data-test-result-modular-encounter-set-pack-name=${this.modularEncounterSet.slug}]`
      )
      .hasText(this.modularEncounterSet.pack.name);
    assert
      .dom(`[data-test-result-modular-encounter-set-difficulty]`)
      .hasText(`difficulty ${this.modularEncounterSet.difficulty}`);
    assert.dom('[data-test-result-player-header]').exists();
    assert.dom('[data-test-result-player-hero]').hasText(this.identity.hero);
    assert
      .dom('[data-test-result-player-alter-ego]')
      .hasText(this.identity.alterEgo);
    assert
      .dom('[data-test-result-player-aspect]')
      .hasText(this.result.players[0].aspects[0]);
  });

  test('it does not render player if not given', async function(assert) {
    this.result.players = [];

    await render(hbs`<SituationForm::Result @result={{this.result}} />`);

    assert.dom('[data-test-result-player-header]').doesNotExist();
  });

  test('when no difficulty, does not display a blank difficulty setting', async function(assert) {
    let modularEncounterSet = this.store
      .peekAll('modular-encounter-set')
      .filter(
        modularEncounterSet => modularEncounterSet.pack.name === 'Green Goblin'
      )
      .toArray()[0];
    this.result.modularEncounterSets = [modularEncounterSet];

    await render(hbs`<SituationForm::Result @result={{this.result}} />`);

    assert
      .dom(
        `[data-test-result-modular-encounter-set-name=${modularEncounterSet.slug}]`
      )
      .exists();
    assert
      .dom(
        `[data-test-result-modular-encounter-set-difficulty=${modularEncounterSet.slug}]`
      )
      .doesNotExist();
  });
});
