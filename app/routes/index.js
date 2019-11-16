import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('application');
  },

  setupController(controller, model) {
    controller.set('cities', model);
    controller.fetchOnlineData.perform();
    controller.fetchMaxData.perform();

    controller.set(
      'interval',
      setInterval(() => {
        controller.fetchOnlineData.perform();
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
