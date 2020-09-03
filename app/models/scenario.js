import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class ScenarioModel extends Model {
  @attr name;
  @attr('array', {
    defaultValue() {
      return [];
    },
  })
  features;
  @belongsTo('pack', { async: false }) pack;

  get slug() {
    return this.name.toLowerCase().replace(/ /g, '_');
  }
}
