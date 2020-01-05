import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | pack', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    let store = this.owner.lookup('service:store');
    this.model = store.createRecord('pack', {
      name: 'Ms. Marvel',
      type: 'hero',
    });
  });

  test('it exists', function(assert) {
    assert.ok(this.model);
  });

  test('it has a slug', function(assert) {
    assert.equal(this.model.slug, 'ms_marvel');
  });
});
