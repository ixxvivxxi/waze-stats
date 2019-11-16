import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  model(params) {
    return hash({
      city_id: params.city_id,
    });
  },

  setupController(controller, model) {
    controller.set('city_id', model.city_id);
    controller.fetchData.perform();

    controller.set(
      'interval',
      setInterval(() => {
        controller.fetchTwoDays.perform();
      }, 100000)
    );
  },

  actions: {
    willTransition: function() {
      clearInterval(this.controller.get('interval'));
      return true;
    },
  },
});
