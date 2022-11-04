import Route from '@ember/routing/route';

export default Route.extend({
  model({ cityId }) {
    return cityId;
  },

  setupController(controller, cityId) {
    controller.set('cityId', cityId);
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
