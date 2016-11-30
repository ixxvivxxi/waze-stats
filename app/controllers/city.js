import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  wazersDataset: {
    label: 'Вейзеры',
    fill: false,
    lineTension: 0.1,
    backgroundColor: "rgba(75,192,192,0.4)",
    borderColor: "rgba(75,192,192,1)",
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: "rgba(75,192,192,1)",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    spanGaps: false,
  },
  reportsDataset: {
    label: 'Отчеты',
    fill: false,
    lineTension: 0.1,
    backgroundColor: "rgba(255,235,60,0.4)",
    borderColor: "rgba(255,235,60,1)",
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: "rgba(255,235,60,1)",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "rgba(255,235,60,1)",
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    spanGaps: false,
  },

  twoDaysLine: Ember.computed('twoDays.[]', function() {
    var model = this.get('twoDays');
    var wazers = Object.assign({}, this.get('wazersDataset'));
    wazers.data = model.map(item => item.get('online'));

    var reports = Object.assign({}, this.get('reportsDataset'));
    reports.data = model.map(item => item.get('reports'));
    return {
          labels : model.map((item) => moment(item.get('time')).utcOffset(0).format('DD.MM HH:mm')),
          datasets: [wazers, reports]
      };
  }),
  weekLine: Ember.computed('week.[]', function() {
    var model = this.get('week');
    var wazers = Object.assign({}, this.get('wazersDataset'));
    wazers.data = model.map(item => item.get('online'));

    var reports = Object.assign({}, this.get('reportsDataset'));
    reports.data = model.map(item => item.get('reports'));
    return {
          labels : model.map((item) => moment(item.get('time')).utcOffset(0).format('DD.MM HH:mm')),
          datasets: [wazers, reports]
      };
  }),
  mounthLine: Ember.computed('mounth.[]', function() {
    var model = this.get('mounth');
    var wazers = Object.assign({}, this.get('wazersDataset'));
    wazers.data = model.map(item => item.get('online'));

    var reports = Object.assign({}, this.get('reportsDataset'));
    reports.data = model.map(item => item.get('reports'));
    return {
          labels : model.map((item) => moment(item.get('time')).utcOffset(0).format('DD.MM.YYYY')),
          datasets: [wazers, reports]
      };
  }),
  yearLine: Ember.computed('year.[]', function() {
    var model = this.get('year');
    var wazers = Object.assign({}, this.get('wazersDataset'));
    wazers.data = model.map(item => item.get('online'));

    var reports = Object.assign({}, this.get('reportsDataset'));
    reports.data = model.map(item => item.get('reports'));
    return {
          labels : model.map((item) => moment(item.get('time')).utcOffset(0).format('DD.MM.YYYY')),
          datasets: [wazers, reports]
      };
  }),
  maxWazers: Ember.computed('yearLine.labels.[]', function() {
    var max = Math.max.apply(null,this.get('yearLine.datasets')[0].data);
    return (max === -Infinity) ? '~' : max;
  }),
  maxReports: Ember.computed('yearLine.labels.[]', function() {
    var max = Math.max.apply(null,this.get('yearLine.datasets')[1].data);
    return (max === -Infinity) ? '~' : max;
  }),
  nowWazers: Ember.computed('twoDaysLine.labels.[]', function() {
    var arr = this.get('twoDaysLine.datasets')[0].data;
    var now = arr[arr.length-1];
    return (!now) ? 0 : now;
  }),
  nowReports: Ember.computed('twoDaysLine.labels.[]', function() {
    var arr = this.get('twoDaysLine.datasets')[1].data;
    var now = arr[arr.length-1];
    return (!now) ? 0 : now;
  }),

  actions: {
    refreshData: function() {
      this.set('twoDays', this.store.query('stat', {'a':'city', 'id': this.get('city_id'), 'type':1, 'format':'json'}));
      this.set('week', this.store.query('stat', {'a':'city', 'id': this.get('city_id'), 'type':7, 'format':'json'}));
      this.set('mounth', this.store.query('stat', {'a':'city', 'id': this.get('city_id'), 'type':31, 'format':'json'}));
    },
  }
});
