import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set('cities', this.modelFor('application'));
    this.fillNowPieData();
    this.fillMaxPieData();
    controller.set('interval', setInterval(() => {
      this.fillNowPieData();
    }, 300000));
  },
  fillNowPieData: function() {
    this.set('controller.nowData', []);
    var cities = this.controller.get('cities');
    cities.forEach((city) => {
      Ember.$.getJSON('http://stats.waze.su/data.php?a=city&type=1&format=json&id=' + city.id)
      .then((data) => {
        if (data.stats[data.stats.length-1].online) {
          this.get('controller.nowData').pushObject({
            id: city.id,
            online: data.stats[data.stats.length-1].online,
            backgroundColor: city.color,
            name: city.name
          });
        }
      });
    });

  },
  fillMaxPieData: function() {
    this.set('controller.maxData', []);
    var cities = this.controller.get('cities');
    cities.forEach((city) => {
      Ember.$.getJSON('http://stats.waze.su/data.php?a=city&type=365&format=json&id=' + city.id)
      .then((data) => {
          var max = Math.max.apply(null, data.stats.map((stat) => {return stat.online;}));
          if (max) {
            this.get('controller.maxData').pushObject({
              id: city.id,
              online: max,
              backgroundColor: city.color,
              name: city.name
            });
          }
      });
    });

  },

  actions: {
    willTransition: function() {
      clearInterval(this.controller.get('interval'));
        return true;
    },
    refreshData: function() {
      this.fillNowPieData();
    }
  }
});
