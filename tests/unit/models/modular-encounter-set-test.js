import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | modular encounter set', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    let store = this.owner.lookup('service:store');
    this.model = store.createRecord('modular-encounter-set', {
      name: 'Bomb Scare',
      difficulty: 1,
    });
  });

  test('it exists', function(assert) {
    assert.ok(this.model);
  });

  test('it has a slug', function(assert) {
    assert.equal(this.model.slug, 'bomb_scare');
  });
});
