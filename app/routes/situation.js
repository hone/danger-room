import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class SituationRoute extends Route {
  @service store;
  model() {
    let packs = this.store.peekAll('pack');

    return hash({
      identities: this.store.peekAll('identity'),
      modularEncounterSets: this.store.peekAll('modular-encounter-set'),
      scenarios: this.store.peekAll('scenario'),
      packs: {
        core: packs.filterBy('type', 'core'),
        heroes: packs.filterBy('type', 'hero'),
        scenarios: packs.filterBy('type', 'scenario'),
        campaigns: packs.filterBy('type', 'campaign'),
        printNPlays: packs.filterBy('type', 'print-n-play'),
      },
    });
  }
}
