import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import shuffle from 'lodash.shuffle';

const DIFFICULTY_MODES = ['standard', 'expert'];
const CHOSEN_DIFFICULTY_MODES = ['random', 'standard', 'expert'];
const ASPECTS = ['Aggression', 'Justice', 'Leadership', 'Protection'];

export default class SituationForm extends Component {
  @tracked result = null;
  @tracked modularRadioIndex = 0;
  players = [0, 1, 2, 3, 4];
  numModularEncounterSets = [...Array(3).keys()].map(i => i + 1);

  setupParameters() {
    if (!CHOSEN_DIFFICULTY_MODES.includes(this.parameters.difficultyMode)) {
      this.parameters.difficultyMode = "random";
    }
    if (!this.numModularEncounterSets.includes(this.parameters.numModularEncounterSets)) {
      this.parameters.numModularEncounterSets = 1;
    }
    if (this.parameters.numOfPlayers > 4 && this.parameters.numOfPlayers < 0) {
      this.parameters.numOfPlayers = 0;
    }
  }

  buildResult(result) {
    let scenario = null;
    let difficultyMode = null;
    let modularEncounterSets = [];
    let players = [];

    if (result.scenario.length > 0) {
      scenario = this.scenarios.find(element => element.slug === result.scenario);
    }
    if (result.difficultyMode.length > 0) {
      if (DIFFICULTY_MODES.includes(result.difficultyMode)) {
        difficultyMode = result.difficultyMode;
      }
    }
    result.modularEncounterSets.forEach(inputSet => {
      let foundSet = this.modularEncounterSets.find(dataSet => dataSet.slug === inputSet);
      if (foundSet) {
        modularEncounterSets.push(foundSet);
      }
    });
    if (result.players) {
      players = result.players.map(player => {
        let id = this.identities.find(i => i.id === player.identity);
        if (id) {
          return {
            identity: id,
            aspect: player.aspect,
          };
        }
      });
    }

    if (scenario && difficultyMode && modularEncounterSets.length > 0) {
      return {
        scenario,
        difficultyMode,
        modularEncounterSets,
        players,
      };
    }
  }

  constructor(owner, args) {
    super(owner, args);

    this.identities = args.model.identities;
    this.modularEncounterSets = args.model.modularEncounterSets;
    this.scenarios = args.model.scenarios;
    this.parameters = args.state.parameters;
    this.setupParameters();
    this.result = this.buildResult(args.state.result);
    this.submit = args.submit;
  }

  @action
  generate() {
    let modulars = shuffle(this.modularEncounterSets.toArray());
    let sets = [];
    for (let i = 0; i < this.parameters.numModularEncounterSets; i++) {
      sets.push(modulars.pop());
    }
    let difficultyMode = this.parameters.difficultyMode;
    if (difficultyMode === "random") {
      difficultyMode = shuffle(DIFFICULTY_MODES).pop();
    }
    let scenario = this.scenarios.find(s => s.id == this.parameters.scenario);
    if (!scenario) {
      scenario = shuffle(this.scenarios.toArray())[0];
    }
    let players = [];
    if (this.parameters.numOfPlayers > 0) {
      let identities = shuffle(this.identities.toArray());
      for (let i = 0; i < this.parameters.numOfPlayers; i++) {
        players.push({
          identity: identities.pop(),
          aspect: shuffle(ASPECTS)[0],
        });
      }
    }

    this.result = {
      scenario,
      difficultyMode,
      modularEncounterSets: sets,
      players,
    };

    let resultState = {
      parameters: {
        difficultyMode: this.parameters.difficultyMode,
        numModularEncounterSets: this.parameters.numModularEncounterSets,
        scenario: this.parameters.scenario,
        numOfPlayers: this.parameters.numOfPlayers,
      },
      result: {
        scenario: this.result.scenario.slug,
        difficultyMode: this.result.difficultyMode,
        modularEncounterSets: this.result.modularEncounterSets.map(set => set.slug),
        players: this.result.players.map(player => {
          return {
            identity: player.identity.id,
            aspect: player.aspect
          };
        }),
      },
    };
    this.submit(resultState);
  }
}
