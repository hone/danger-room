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

  @action
  generate() {
    let modulars = shuffle(this.modularEncounterSets);
    let sets = [];
    for (let i = 0; i < this.modularRadioIndex + 1; i++) {
      sets.push(modulars.pop());
    }
    
    this.state = {
      villain: shuffle(this.villains)[0],
      modularEncounterSets: sets,
    };
  }

  @action
  modularChanged(index) {
    this.modularRadioIndex = index;
  }
}
