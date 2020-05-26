import Model, { attr, hasMany } from '@ember-data/model';

export default class PackModel extends Model {
  @attr name;
  @attr type;
  @hasMany('identity', { async: false }) identities;
  @hasMany('modular-encounter-set', { async: false }) modularEncounterSets;
  @hasMany('scenario', { async: false }) scenarios;

  get slug() {
    return this.name
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/\./g, '');
  }
}
