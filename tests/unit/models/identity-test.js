import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | identity', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    let store = this.owner.lookup('service:store');
    this.model = store.createRecord('identity', {
      alterEgo: 'Peter Parker',
      hero: 'Spider-Man',
    });
  })

  test('it exists', function(assert) {
    assert.ok(this.model);
  });

  test('it has a slug', function(assert) {
    assert.equal(this.model.slug, 'spider-man');
  });
});
