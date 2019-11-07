import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SituationController extends Controller {
  queryParams = ['villain', {
    chosenDifficultyMode: 'chosen_difficulty_mode',
  }, {
    chosenNumModularEncounterSets: 'chosen_num_modular_encounter_sets',
  }, {
    difficultyMode: 'difficulty_mode'
  }, {
    modularEncounterSets: 'modular_encounter_sets'
  }];
  @tracked villain = "";
  @tracked chosenDifficultyMode = "";
  @tracked chosenNumModularEncounterSets = 1;
  @tracked difficultyMode = "";
  @tracked modularEncounterSets = [];

  get state() {
    return {
      parameters: {
        difficultyMode: this.chosenDifficultyMode,
        numModularEncounterSets: this.chosenNumModularEncounterSets,
      },
      result: {
        villain: this.villain,
        difficultyMode: this.difficultyMode,
        modularEncounterSets: this.modularEncounterSets,
      },
    };
  }

  @action
  submit(state) {
    console.log(state);
    this.chosenDifficultyMode = state.parameters.difficultyMode;
    this.chosenNumModularEncounterSets = state.parameters.numModularEncounterSets;
    this.villain = state.results.villain;
    this.difficultyMode = state.results.difficultyMode;
    this.modularEncounterSets = state.results.modularEncounterSets;
  }
}
