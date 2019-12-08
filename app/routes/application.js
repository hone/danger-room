import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Data from 'danger-room/data/data';

export default class ApplicationRoute extends Route {
  @service store;
  model() {
    this.store.push(Data);
  }
}
