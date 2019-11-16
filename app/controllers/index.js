import Controller from '@ember/controller';
import { get, set, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';
import { task } from 'ember-concurrency';

const pieDefaultData = {
  datasets: [
    {
      label: '',
      data: [1],
      backgroundColor: ['#838383'],
    },
  ],
  labels: ['нет данных'],
};

export default Controller.extend({
  data: service(),

  yearIconType: 'bar',
  yearChartType: 'doughnut',
  onlineIconType: 'bar',
  onlineChartType: 'doughnut',

  init() {
    this._super(...arguments);
    this.setProperties({ onlineData: [], maxData: [] });
  },

  isOnlineChartTypeDoughnut: computed('onlineChartType', function() {
    return this.onlineChartType === 'doughnut';
  }),

  isYearChartTypeDoughnut: computed('yearChartType', function() {
    return this.yearChartType === 'doughnut';
  }),

  getPieData: function(data) {
    if (data.length === 0) {
      return pieDefaultData;
    }

    data = data.sortBy('online').reverse();
    return {
      datasets: [
        {
          label: '',
          data: data.map(item => {
            return item.online;
          }),
          backgroundColor: data.map(item => {
            return item.backgroundColor;
          }),
        },
      ],
      labels: data.map(item => {
        return item.name;
      }),
    };
  },

  pieOnlineData: computed('onlineData.[]', function() {
    return this.getPieData(this.onlineData);
  }),

  pieMaxData: computed('maxData.[]', function() {
    return this.getPieData(this.maxData);
  }),

  fetchOnlineData: task(function*() {
    const citiesData = yield all(
      this.cities.map(city => {
        city;
        return this.data.fetchData.perform(city.id, 1).then(data => {
          return {
            id: city.id,
            online: data[data.length - 1].online,
            backgroundColor: city.color,
            name: city.name,
          };
        });
      })
    );

    this.set(
      'onlineData',
      citiesData.filter(item => item.online)
    );
  }),

  fetchMaxData: task(function*() {
    const citiesData = yield all(
      this.cities.map(city => {
        city;
        return this.data.fetchData.perform(city.id, 365).then(data => {
          const max = Math.max.apply(
            null,
            data.map(stat => {
              return stat.online;
            })
          );
          return {
            id: city.id,
            online: max,
            backgroundColor: city.color,
            name: city.name,
          };
        });
      })
    );

    this.set(
      'maxData',
      citiesData.filter(item => item.online)
    );
  }),

  actions: {
    changeChart: function(type) {
      if (get(this, type + 'ChartType') === 'doughnut') {
        set(this, type + 'ChartType', 'bar');
        set(this, type + 'IconType', 'pie');
      } else {
        set(this, type + 'ChartType', 'doughnut');
        set(this, type + 'IconType', 'bar');
      }
    },

    refreshOnline() {
      this.fetchOnlineData.perform();
    },

    refreshMax() {
      this.fetchMaxData.perform();
    },
  },
});
