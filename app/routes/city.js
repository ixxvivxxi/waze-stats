import Ember from 'ember';

export default Ember.Route.extend({

  model(params) {
    return Ember.RSVP.hash({
      city_id: params.city_id,
    });
  },

  setupController(controller, model) {

    controller.set('city_id', model.city_id);

    this.controller.getData();

    controller.set('interval', setInterval(() => {
      this.controller.getData();
    }, 300000));

  },

  actions: {
    willTransition: function () {
      clearInterval(this.controller.get('interval'));
      return true;
    },
  }
});
