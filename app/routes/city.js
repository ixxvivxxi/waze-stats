import Route from '@ember/routing/route';
import { CITIES } from 'waze-stats/config';

export default Route.extend({
  model({ cityId }) {
    return CITIES.find((city) => +city.id === +cityId);
  },

  setupController(controller, model) {
    controller.set('model', model);
    controller.fetchData.perform();

    controller.set(
      'interval',
      setInterval(() => {
        controller.fetchTwoDays.perform();
      }, 100000)
    );
  },

  actions: {
    willTransition() {
      clearInterval(this.controller.get('interval'));
      return true;
    },
  },
});
