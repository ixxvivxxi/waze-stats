import DS from 'ember-data';

var i = 1;

export default DS.RESTSerializer.extend({
  primaryKey: 'time',

  normalize(type, hash) {
    var s = this._super(type, hash);
    s.data.id = hash.cityId + hash.time;
    return s;
  }
});
