import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Data from 'danger-room/data/data';

module('Integration | Component | packs', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.clickedPackId = null;
    this.store = this.owner.lookup('service:store');
    this.store.push(Data);

    let packs = this.store.peekAll('pack');
    this.packs = {
      core: packs.filterBy('type', 'core'),
      heroes: packs.filterBy('type', 'hero'),
      scenarios: packs.filterBy('type', 'scenario'),
    };
    this.ownedPacks = packs.map(pack => pack);
    this.action = packId => {
      this.clickedPackId = packId;
    };
  });

  test('it renders all packs', async function(assert) {
    await render(
      hbs`<Packs @packs={{this.packs}} @ownedPacks={{this.ownedPacks}} @action={{this.action}} />`
    );

    for (let [header, type] of Object.entries({
      Core: 'core',
      Heroes: 'hero',
      Scenarios: 'scenario',
    })) {
      let key = header.toLowerCase();
      assert.dom(`[data-test-heading-pack=${key}]`).hasText(header);
      this.packs[key].forEach(pack => {
        assert
          .dom(`[data-test-checkbox-label="${type}:${pack.slug}"]`)
          .hasText(pack.name);
      });
    }
  });

  test('it has on onclick handler for non core packs', async function(assert) {
    await render(
      hbs`<Packs @packs={{this.packs}} @ownedPacks={{this.ownedPacks}} @action={{this.action}} />`
    );

    await click('[data-test-checkbox="hero:captain_america"]');
    assert.equal(this.clickedPackId, 3);
  });

  test('core input is disabled', async function(assert) {
    await render(
      hbs`<Packs @packs={{this.packs}} @ownedPacks={{this.ownedPacks}} @action={{this.action}} />`
    );
    assert.dom('[data-test-checkbox="core:core"]').hasAttribute('disabled');

    await click('[data-test-checkbox="core:core"]');
    assert.equal(this.clickedPadId, null);
  });
});
