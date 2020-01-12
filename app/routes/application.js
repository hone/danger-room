import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import Data from 'danger-room/data/data';
import ApplicationRouteMixin from 'ember-simple-auth-auth0/mixins/application-route-mixin';

export default class ApplicationRoute extends Route.extend(
  ApplicationRouteMixin
) {
  @service store;
  model() {
    this.store.push(Data);
  }

  beforeSessionExpired() {
    // Do custom async logic here, e.g. notify
    // the user that they are about to be logged out.

    return RSVP.resolve();
  }
}
