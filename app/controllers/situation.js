import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SituationController extends Controller {
  queryParams = [{
    chosenDifficultyMode: 'chosen_difficulty_mode',
  }, {
    chosenNumModularEncounterSets: 'chosen_num_modular_encounter_sets',
  }, {
    chosenNumOfPlayers: 'chosen_num_of_players',
  }, {
    chosenVillain: 'chosen_villain',
  }, {
    difficultyMode: 'difficulty_mode'
  }, {
    modularEncounterSets: 'modular_encounter_sets'
  }, 'players', 'villain'];
  @tracked chosenVillain = "random";
  @tracked chosenDifficultyMode = "";
  @tracked chosenNumModularEncounterSets = 1;
  @tracked chosenNumOfPlayers = 0;
  @tracked difficultyMode = "";
  @tracked modularEncounterSets = [];
  @tracked players = [];
  @tracked villain = "";

  get state() {
    return {
      parameters: {
        difficultyMode: this.chosenDifficultyMode,
        numModularEncounterSets: this.chosenNumModularEncounterSets,
        numOfPlayers: this.chosenNumOfPlayers,
        villain: this.chosenVillain,
      },
      result: {
        difficultyMode: this.difficultyMode,
        modularEncounterSets: this.modularEncounterSets,
        players: this.players,
        villain: this.villain,
      },
    };
  }

  @action
  submit(state) {
    this.chosenVillain = state.parameters.villain;
    this.chosenDifficultyMode = state.parameters.difficultyMode;
    this.chosenNumModularEncounterSets = state.parameters.numModularEncounterSets;
    this.chosenNumOfPlayers = state.parameters.numOfPlayers;
    this.difficultyMode = state.result.difficultyMode;
    this.modularEncounterSets = state.result.modularEncounterSets;
    this.players = state.result.players;
    this.villain = state.result.villain;
  }
}
