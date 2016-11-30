import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr(''),
  online: DS.attr('number'),
  reports: DS.attr('number')
});
