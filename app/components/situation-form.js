import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import shuffle from 'lodash.shuffle';
import ModularEncounterSets from 'danger-room/data/modular-encounter-sets';
import Villains from 'danger-room/data/villains';

const DIFFICULTY_MODES = ['standard', 'expert'];
const CHOSEN_DIFFICULTY_MODES = ['random', 'standard', 'expert'];

export default class SituationForm extends Component {
  @tracked result = null;
  @tracked modularRadioIndex = 0;
  numModularEncounterSets = [1, 2, 3];

  constructor(owner, args) {
    super(owner, args);
    let villain = null;
    let modularEncounterSets = [];
    let difficultyMode = null;

    this.parameters = args.state.parameters;
    if (!CHOSEN_DIFFICULTY_MODES.includes(this.parameters.difficultyMode)) {
      this.parameters.difficultyMode = "random";
    }
    if (!this.numModularEncounterSets.includes(this.parameters.numModularEncounterSets)) {
      this.parameters.numModularEncounterSets = 1;
    }

    if (args.state.result.villain.length > 0) {
      let normalizedName = args.state.result.villain.toLowerCase();

      villain = Villains.find(element => {
        return element.name.toLowerCase() === normalizedName;
      });
    }
    if (args.state.result.difficultyMode.length > 0) {
      if (DIFFICULTY_MODES.includes(args.state.result.difficultyMode)) {
        difficultyMode = args.state.result.difficultyMode;
      }
    }
    args.state.result.modularEncounterSets.forEach(inputSet => {
      let normalizedName = inputSet.toLowerCase();
      let foundSet = ModularEncounterSets.find(dataSet => {
        return dataSet.name.toLowerCase() === normalizedName;
      });
      if (foundSet) {
        modularEncounterSets.push(foundSet);
      }
    });

    if (villain && difficultyMode && modularEncounterSets.length > 0) {
      this.result = {
        villain,
        difficultyMode,
        modularEncounterSets,
      };
    }
    this.submit = args.submit;
  }

  @action
  generate() {
    let villain = shuffle(Villains)[0];
    let modulars = shuffle(ModularEncounterSets);
    let sets = [];
    for (let i = 0; i < this.parameters.numModularEncounterSets; i++) {
      sets.push(modulars.pop());
    }
    let difficultyMode = this.parameters.difficultyMode;
    if (difficultyMode === "random") {
      difficultyMode = shuffle(DIFFICULTY_MODES).pop();
    }

    this.result = {
      villain,
      difficultyMode,
      modularEncounterSets: sets,
    };

    let resultState = {
      parameters: {
        difficultyMode: this.parameters.difficultyMode,
        numModularEncounterSets: this.parameters.numModularEncounterSets,
      },
      results: {
        villain: this.result.villain.name,
        difficultyMode: this.result.difficultyMode,
        modularEncounterSets: this.result.modularEncounterSets.map(set => set.name),
      },
    };
    this.submit(resultState);
  }
}
