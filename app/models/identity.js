import Model, { attr, belongsTo } from '@ember-data/model';

export default class IdentityModel extends Model {
  @attr alterEgo;
  @attr hero;
  @belongsTo('pack', { async: false }) pack;

  get slug() {
    return this.hero
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/\./g, '');
  }
}
