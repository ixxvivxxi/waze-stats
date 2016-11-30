import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      city_id: params.city_id,
    });
  },
  setupController(controller, model) {
    controller.set('city_id', model.city_id);
    controller.set('twoDays', this.store.query('stat', {'a':'city', 'id': model.city_id, 'type':1, 'format':'json'}));
    controller.set('week', this.store.query('stat', {'a':'city', 'id': model.city_id, 'type':7, 'format':'json'}));
    controller.set('mounth', this.store.query('stat', {'a':'city', 'id': model.city_id, 'type':31, 'format':'json'}));
    controller.set('year', this.store.query('stat', {'a':'city', 'id': model.city_id, 'type':365, 'format':'json'}));

    controller.set('interval', setInterval(() => {
      controller.set('twoDays', this.store.query('stat', {'a':'city', 'id': model.city_id, 'type':1, 'format':'json'}));
      controller.set('week', this.store.query('stat', {'a':'city', 'id': model.city_id, 'type':7, 'format':'json'}));
      controller.set('mounth', this.store.query('stat', {'a':'city', 'id': model.city_id, 'type':31, 'format':'json'}));
    }, 300000));

  },
  actions: {
    willTransition: function() {
        clearInterval(this.controller.get('interval'));
        return true;
    }
  }
});
