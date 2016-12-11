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
    nearest: false,
    data: []
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
    data: []
  },
  wazersMiddle: {
    label: 'Среднее',
    fill: false,
    spanGaps: true,
    lineTension: 0,
    backgroundColor: "rgba(33,133,208,0.4)",
    borderColor: "rgba(33,133,208,1)",
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: "rgba(33,133,208,1)",
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: "rgba(33,133,208,1)",
    pointHoverBorderColor: "rgba(33,133,208,1)",
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: []
  },
  getLineData: function(model) {
    this.set('wazersMiddle.data', []);
    if (!model) {
      return {
            labels : [],
            datasets: [this.get('wazersDataset'), this.get('reportsDataset')]
        };
    }

    var days = Math.round((model[model.length-1].time - model[0].time)/86400000);
    var wazers = Object.assign({}, this.get('wazersDataset'));
    wazers.data = model.map(item => item.online);

    var reports = Object.assign({}, this.get('reportsDataset'));
    reports.data = model.map((item) => {return item.reports;});

    var labels = model.map((item, index) => {
        if (index === 0 || days === 365) {
          return moment(item.time).utcOffset(0).format('DD.MM.YYYY');
        } else if (moment(item.time).utcOffset(0).hour() === 0 && moment(item.time).utcOffset(0).minute() === 0 ) {
          return moment(item.time).utcOffset(0).format('DD.MM.YYYY');
        } else {
          return moment(item.time).utcOffset(0).format('HH:mm');
        }
    });


    if (days === 365) {
      var middle = Object.assign({}, this.get('wazersMiddle'));

      var firstIndex = 0,
      value = 0;
      model.forEach( (item, index) => {
        value += item.online;
        if (moment(item.time).day() === 0) {
          for (var i = firstIndex; i < index; i++) {
            middle.data.push(null);
          }
          middle.data.push(Math.round(value/(index - firstIndex+1)));
          firstIndex = index+1;
          value = 0;
        }
      });
      return {
            labels : labels,
            datasets: [wazers, reports, middle]
        };
    } else {
      return {
            labels : labels,
            datasets: [wazers, reports]
        };
    }

  },
  twoDaysLine: Ember.computed('twoDays.[]', function() {
    return this.getLineData(this.get('twoDays'));
  }),
  weekLine: Ember.computed('week.[]', function() {
    return this.getLineData(this.get('week'));
  }),
  mounthLine: Ember.computed('mounth.[]', function() {
    return this.getLineData(this.get('mounth'));
  }),
  yearLine: Ember.computed('year.[]', function() {
    return this.getLineData(this.get('year'));
  }),
  maxWazers: Ember.computed('year.[]', function() {
    if(!this.get('year')) {
      return '~';
    }
    var index = this.maxIndex(this.get('year'), 'online');
    return this.get('year')[index].online;
  }),
  maxWazersDate: Ember.computed('year.[]', function() {
    if(!this.get('year')) {return '';}
    var index = this.maxIndex(this.get('year'), 'online');
    return moment(this.get('year')[index].time).utcOffset(0).format('DD.MM.YYYY');
  }),
  maxReports: Ember.computed('year.[]', function() {
    if(!this.get('year')) {return '~'; }
    var index = this.maxIndex(this.get('year'), 'reports');
    return this.get('year')[index].reports;
  }),
  maxReportsDate: Ember.computed('year.[]', function() {
    if(!this.get('year')) {return '';}
    var index = this.maxIndex(this.get('year'), 'reports');
    return moment(this.get('year')[index].time).utcOffset(0).format('DD.MM.YYYY');
  }),
  nowWazers: Ember.computed('twoDaysLine', function() {
    var arr = this.get('twoDaysLine.datasets')[0].data;
    var now = arr[arr.length-1];
    return (!now) ? 0 : now;
  }),
  nowReports: Ember.computed('twoDaysLine', function() {
    var arr = this.get('twoDaysLine.datasets')[1].data;
    var now = arr[arr.length-1];
    return (!now) ? 0 : now;
  }),
  maxIndex: function(data, type) {
    var max = 0,
    index = 0;
    data.forEach((item, i) => {
      if (max <= item[type]) {
        max = item[type];
        index = i;
      }
    });
    return index;
  }

});
