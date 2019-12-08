import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';

export default class SituationRoute extends Route {
  @service store;
  model() {
    return hash({
      identities: this.store.findAll('identity'),
      modularEncounterSets: this.store.findAll('modular-encounter-set'),
    });
  }
}
