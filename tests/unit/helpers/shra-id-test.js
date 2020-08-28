import { shraId } from 'danger-room/helpers/shra-id';
import { module, test } from 'qunit';

module('Unit | Helper | isEqual', function() {
  test('it upcases the string', function(assert) {
    assert.equal(shraId(['Thor']), 'THOR');
  });

  test('it replaces spaces with underscore', function(assert) {
    assert.equal(shraId(['Captain Marvel']), 'CAPTAIN_MARVEL');
  });

  test('it replaces dash with underscore', function(assert) {
    assert.equal(shraId(['Spider-Man']), 'SPIDER_MAN');
  });
});
