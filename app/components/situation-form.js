import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import shuffle from 'lodash.shuffle';
import ModularEncounterSets from 'danger-room/data/modular-encounter-sets';
import Villains from 'danger-room/data/villains';

export default class SituationForm extends Component {
  modularEncounterSets = ModularEncounterSets;
  villains = Villains;
  @tracked state = null;
  @tracked modularRadioIndex = 0;
  @tracked difficultyMode = "random";

  @action
  generate() {
    let modulars = shuffle(this.modularEncounterSets);
    let sets = [];
    for (let i = 0; i < this.modularRadioIndex + 1; i++) {
      sets.push(modulars.pop());
    }
    let difficultyMode = this.difficultyMode;
    if (difficultyMode === "random") {
      difficultyMode = shuffle(["standard", "expert"]).pop();
    }
    
    this.state = {
      villain: shuffle(this.villains)[0],
      modularEncounterSets: sets,
      difficultyMode,
    };
  }

  @action
  modularChanged(index) {
    this.modularRadioIndex = index;
  }

  @action
  difficultyModeChanged(difficulty) {
    this.difficultyMode = difficulty;
  }
}
