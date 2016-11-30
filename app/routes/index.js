import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('cities', this.modelFor('application'));
  },
});
