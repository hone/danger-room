import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Data from 'danger-room/data/data';

module('Integration | Component | packs/checkbox', function(hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function() {
    this.clickedPackId = null;
    this.store = this.owner.lookup('service:store');
    this.store.push(Data);

    let packs = this.store.peekAll('pack');
    this.pack = packs.toArray()[2];
    this.ownedPacks = packs.map(pack => pack);
    this.action = packId => {
      this.clickedPackId = packId;
    };
  });

  test('it renders', async function(assert) {
    await render(
      hbs`<Packs::Checkbox @pack={{this.pack}} @ownedPacks={{this.ownedPacks}} />`
    );

    assert
      .dom('[data-test-checkbox-label="hero:captain_america"]')
      .hasText('Captain America');
    assert.dom('[data-test-checkbox="hero:captain_america"]').exists();
  });
});
