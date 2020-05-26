import Model, { attr, belongsTo } from '@ember-data/model';

export default class ScenarioModel extends Model {
  @attr name;
  @belongsTo('pack', { async: false }) pack;

  get slug() {
    return this.name.toLowerCase().replace(/ /g, '_');
  }
}
