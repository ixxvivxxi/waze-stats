import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      city_id: params.city_id,
    });
  },
  setupController(controller, model) {
    controller.set('city_id', model.city_id);
    this.getData();
    Ember.$.getJSON('http://stats.waze.su/data.php?a=city&type=365&format=json&id=' + model.city_id).then(data => {
      controller.set('year', data.stats);
    });
    controller.set('interval', setInterval(() => {
      this.getData();
    }, 300000));

  },
  getData: function() {
    var city = this.controller.get('city_id');
    Ember.$.getJSON('http://stats.waze.su/data.php?a=city&type=1&format=json&id=' + city).then(data => {
      this.controller.set('twoDays', data.stats);
    });
    Ember.$.getJSON('http://stats.waze.su/data.php?a=city&type=7&format=json&id=' + city).then(data => {
      this.controller.set('week', data.stats);
    });
    Ember.$.getJSON('http://stats.waze.su/data.php?a=city&type=31&format=json&id=' + city).then(data => {
      this.controller.set('mounth', data.stats);
    });

  },
  actions: {
    willTransition: function() {
        clearInterval(this.controller.get('interval'));
        return true;
    },
    refreshData: function() {
      this.getData();
    }
  }
});
