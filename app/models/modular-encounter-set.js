import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class ModularEncounterSetModel extends Model {
  @attr name;
  @attr difficulty;
  @belongsTo('pack', { async: false }) pack;

  get slug() {
    return this.name.toLowerCase().replace(/ /g, '_');
  }
}
