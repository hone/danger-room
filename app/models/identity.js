import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class IdentityModel extends Model {
  @attr alterEgo;
  @attr hero;
  @belongsTo('pack') pack;

  get slug() {
    return this.hero.toLowerCase().replace(/ /g, '_');
  }
}
