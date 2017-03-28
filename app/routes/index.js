import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function (controller) {
    controller.set('cities', this.modelFor('application'));

    this.fillNowPieData();
    this.fillMaxPieData();

    controller.set('interval', setInterval(() => {
      this.fillNowPieData();
    }, 300000));
  },

  fillNowPieData: function () {
    this.set('controller.nowData', []);
    this.set('controller.nowLoad', true);

    const cities = this.controller.get('cities');

    const promises = cities.map((city) => {
      return Ember.$.getJSON('http://stats.waze.su/data.php?a=city&type=1&format=json&id=' + city.id)
                  .then((data) => {
                    return {
                      id:              city.id,
                      online:          data.stats[data.stats.length-1].online,
                      backgroundColor: city.color,
                      name:            city.name
                    };

                  });
    });

    Ember.RSVP.all(promises)
         .then((items) => {
           items.forEach((data) => {
             if (data.online > 0) {
               this.get('controller.nowData')
                   .pushObject(data);
             }
           });
           this.set('controller.nowLoad', false);
         });

  },

  fillMaxPieData: function () {

    this.set('controller.maxData', []);
    this.set('controller.maxLoad', true);

    const cities = this.controller.get('cities');

    const promises = cities.map((city) => {
      return Ember.$.getJSON('http://stats.waze.su/data.php?a=city&type=365&format=json&id=' + city.id)
                  .then((data) => {
                    const max = Math.max.apply(null, data.stats.map((stat) => {
                      return stat.online;
                    }));
                    return {
                      id:              city.id,
                      online:          max,
                      backgroundColor: city.color,
                      name:            city.name
                    };

                  });
    });

    Ember.RSVP.all(promises)
         .then((items) => {
           items.forEach((data) => {
             if (data.online > 0) {
               this.get('controller.maxData')
                   .pushObject(data);
             }
           });
           this.set('controller.maxLoad', false);
         });
  },

  actions: {
    willTransition() {
      clearInterval(this.controller.get('interval'));
      return true;
    },

    refreshNow() {
      this.fillNowPieData();
    },

    refreshMax() {
      this.fillMaxPieData();
    }
  }
});
