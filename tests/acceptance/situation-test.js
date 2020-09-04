import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | situation', function(hooks) {
  setupApplicationTest(hooks);

  test('generating a situation', async function(assert) {
    await visit('/situation');

    assert.equal(currentURL(), '/situation');

    await click('[data-test-generate]');

    // check the URL has changed
    let newURI = currentURL();
    assert.notOk(newURI.includes('chosen_difficulty_mode=random'));
    assert.notOk(newURI.includes('chosen_scenario=random'));
    assert.notOk(newURI.includes('chosen_num_of_players=0'));
    assert.ok(newURI.includes('difficulty_mode='));
    assert.ok(newURI.includes('modular_encounter_sets='));
    assert.ok(newURI.includes('scenario='));
    assert.dom('[data-test-result-scenario]').exists();

    await fillIn('[data-test-parameters-scenario]', 1);
    await click("[data-test-parameters-radio='difficulty-mode:standard']");
    await click("[data-test-parameters-radio='modular-encounter-sets:2']");
    await click('[data-test-generate]');

    newURI = currentURL();
    assert.ok(newURI.includes('chosen_scenario=1'));
    assert.ok(newURI.includes('chosen_difficulty_mode=standard'));
    assert.ok(newURI.includes('chosen_num_modular_encounter_sets=2'));
    assert.ok(newURI.includes('difficulty_mode=standard'));
    assert.ok(newURI.includes('modular_encounter_sets='));
    assert.ok(newURI.includes('scenario=rhino'));
    assert.dom('[data-test-result-scenario]').exists();
  });

  test('displays existing scenario', async function(assert) {
    let uri =
      '/situation?chosen_difficulty_mode=random&chosen_num_of_players=1&difficulty_mode=standard&modular_encounter_sets=%5B%22legions_of_hydra%22%5D&players=%5B%7B%22identity%22%3A%225%22%2C%22aspects%22%3A[%22Aggression%22]%7D%5D&scenario=ultron';
    await visit(uri);

    assert.equal(currentURL(), uri);

    assert.dom('[data-test-result-scenario]');
    assert.dom('[data-test-result-scenario-name]').hasText('Ultron');
    assert.dom('[data-test-result-difficulty-mode]').hasText('standard');
    assert.dom(
      '[data-test-result-modular-encounter-set-pack-name=legions_of_hydra]'
    );
    assert.dom('[data-test-result-player]');
    assert.dom('[data-test-result-player-hero]').hasText('Black Panther');
    assert.dom('[data-test-result-player-aspect]').hasText('Aggression');
  });
});
