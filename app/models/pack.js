import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default class PackModel extends Model {
  @attr name;
  @hasMany('identity') identities;
  @hasMany('modular-encounter-set') modularEncounterSets;
}
