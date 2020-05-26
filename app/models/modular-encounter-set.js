import Model, { attr, belongsTo } from '@ember-data/model';

export default class ModularEncounterSetModel extends Model {
  @attr name;
  @attr difficulty;
  @belongsTo('pack', { async: false }) pack;

  get slug() {
    return this.name.toLowerCase().replace(/ /g, '_');
  }
}
