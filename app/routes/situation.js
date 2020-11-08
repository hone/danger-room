import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class SituationRoute extends Route {
  @service store;

  async model() {
    let packs = await this.store.findAll('pack', {
      include: 'identities,scenarios,modular-encounter-sets',
    });

    return hash({
      identities: this.store.peekAll('identity'),
      modularEncounterSets: this.store.peekAll('modular-encounter-set'),
      scenarios: this.store.peekAll('scenario'),
      packs: {
        core: packs.filterBy('packType', 'core'),
        heroes: packs.filterBy('packType', 'hero'),
        scenarios: packs.filterBy('packType', 'scenario'),
        campaigns: packs.filterBy('packType', 'campaign'),
        printNPlays: packs.filterBy('packType', 'print-n-play'),
      },
    });
  }
}
