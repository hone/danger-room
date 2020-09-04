import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class IdentityModel extends Model {
  @attr alterEgo;
  @attr hero;
  @attr('array', {
    defaultValue() {
      return [];
    },
  })
  features;
  @belongsTo('pack', { async: false }) pack;

  get slug() {
    return this.hero
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/\./g, '');
  }
}
