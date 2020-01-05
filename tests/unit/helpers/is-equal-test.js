import { isEqual } from 'danger-room/helpers/is-equal';
import { module, test } from 'qunit';

module('Unit | Helper | isEqual', function() {
  test('returns true', function(assert) {
    assert.ok(isEqual(['foo', 'foo']));
  });

  test('returns false', function(assert) {
    assert.notOk(isEqual(['foo', 'bar']));
  });
});
