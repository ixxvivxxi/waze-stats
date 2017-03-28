import Ember from 'ember';
import moment from 'moment';

const {Controller, computed, RSVP, $} = Ember;

export default Controller.extend({

  wazersDataset: {
    label:                     'Вейзеры',
    fill:                      false,
    lineTension:               0.1,
    backgroundColor:           "rgba(75,192,192,0.4)",
    borderColor:               "rgba(75,192,192,1)",
    borderCapStyle:            'butt',
    borderDash:                [],
    borderDashOffset:          0.0,
    borderJoinStyle:           'miter',
    pointBorderColor:          "rgba(75,192,192,1)",
    pointBackgroundColor:      "#fff",
    pointBorderWidth:          1,
    pointHoverRadius:          5,
    pointHoverBackgroundColor: "rgba(75,192,192,1)",
    pointHoverBorderColor:     "rgba(220,220,220,1)",
    pointHoverBorderWidth:     2,
    pointRadius:               1,
    pointHitRadius:            10,
    spanGaps:                  false,
    nearest:                   false,
    data:                      []
  },

  reportsDataset: {
    label:                     'Отчеты',
    fill:                      false,
    lineTension:               0.1,
    backgroundColor:           "rgba(255,235,60,0.4)",
    borderColor:               "rgba(255,235,60,1)",
    borderCapStyle:            'butt',
    borderDash:                [],
    borderDashOffset:          0.0,
    borderJoinStyle:           'miter',
    pointBorderColor:          "rgba(255,235,60,1)",
    pointBackgroundColor:      "#fff",
    pointBorderWidth:          1,
    pointHoverRadius:          5,
    pointHoverBackgroundColor: "rgba(255,235,60,1)",
    pointHoverBorderColor:     "rgba(220,220,220,1)",
    pointHoverBorderWidth:     2,
    pointRadius:               1,
    pointHitRadius:            10,
    spanGaps:                  false,
    data:                      []
  },

  wazersMiddle: {
    label:                     'Среднее',
    fill:                      false,
    spanGaps:                  true,
    lineTension:               0,
    backgroundColor:           "rgba(33,133,208,0.4)",
    borderColor:               "rgba(33,133,208,1)",
    borderCapStyle:            'butt',
    borderDash:                [],
    borderDashOffset:          0.0,
    borderJoinStyle:           'miter',
    pointBorderColor:          "rgba(33,133,208,1)",
    pointBackgroundColor:      "#fff",
    pointBorderWidth:          1,
    pointHoverRadius:          5,
    pointHoverBackgroundColor: "rgba(33,133,208,1)",
    pointHoverBorderColor:     "rgba(33,133,208,1)",
    pointHoverBorderWidth:     2,
    pointRadius:               1,
    pointHitRadius:            10,
    data:                      []
  },

  getLineData: function (model) {
    this.set('wazersMiddle.data', []);
    if (!model) {
      return {
        labels:   [],
        datasets: [this.get('wazersDataset'), this.get('reportsDataset')]
      };
    }

    const days    = Math.round((model[model.length - 1].time - model[0].time) / 86400000);
    const wazers  = Object.assign({}, this.get('wazersDataset'));

    wazers.data = model.map(item => item.online);

    const reports  = Object.assign({}, this.get('reportsDataset'));
    reports.data = model.map((item) => {
      return item.reports;
    });

    const labels = model.map((item, index) => {
      if (index === 0 || days === 365) {
        return moment(item.time)
          .utcOffset(0)
          .format('DD.MM.YYYY');
      } else if (moment(item.time)
          .utcOffset(0)
          .hour() === 0 && moment(item.time)
          .utcOffset(0)
          .minute() === 0) {
        return moment(item.time)
          .utcOffset(0)
          .format('DD.MM.YYYY');
      } else {
        return moment(item.time)
          .utcOffset(0)
          .format('HH:mm');
      }
    });

    if (days === 365) {
      const middle = Object.assign({}, this.get('wazersMiddle'));

      let firstIndex = 0,
          value      = 0;
      model.forEach((item, index) => {
        value += item.online;
        if (moment(item.time)
            .day() === 0) {
          for (var i = firstIndex; i < index; i++) {
            middle.data.push(null);
          }
          middle.data.push(Math.round(value / (index - firstIndex + 1)));
          firstIndex = index + 1;
          value      = 0;
        }
      });
      return {
        labels:   labels,
        datasets: [wazers, reports, middle]
      };
    } else {
      return {
        labels:   labels,
        datasets: [wazers, reports]
      };
    }

  },

  twoDaysLine: computed('twoDays.[]', function () {
    return this.getLineData(this.get('twoDays'));
  }),

  weekLine: computed('week.[]', function () {
    return this.getLineData(this.get('week'));
  }),

  mounthLine: computed('mounth.[]', function () {
    return this.getLineData(this.get('mounth'));
  }),

  yearLine:   computed('year.[]', function () {
    return this.getLineData(this.get('year'));
  }),

  maxWazers: computed('year.[]', function () {
    if (!this.get('year')) {
      return '~';
    }

    const index = this.maxIndex(this.get('year'), 'online');
    return this.get('year')[index].online;
  }),

  maxWazersDate: computed('year.[]', function () {
    if (!this.get('year')) {
      return '';
    }

    const index = this.maxIndex(this.get('year'), 'online');
    return moment(this.get('year')[index].time)
      .utcOffset(0)
      .format('DD.MM.YYYY');
  }),

  maxReports: computed('year.[]', function () {
    if (!this.get('year')) {
      return '~';
    }

    const index = this.maxIndex(this.get('year'), 'reports');
    return this.get('year')[index].reports;
  }),

  maxReportsDate: computed('year.[]', function () {
    if (!this.get('year')) {
      return '';
    }

    const index = this.maxIndex(this.get('year'), 'reports');
    return moment(this.get('year')[index].time)
      .utcOffset(0)
      .format('DD.MM.YYYY');
  }),

  maxWazersTwoDays: computed('twoDays.[]', function () {
    if (!this.get('twoDays')) {
      return '~';
    }

    const index = this.maxIndex(this.get('twoDays'), 'online');
    return this.get('twoDays')[index].online;
  }),

  maxReportsTwoDays: computed('twoDays.[]', function () {
    if (!this.get('twoDays')) {
      return '~';
    }

    const index = this.maxIndex(this.get('twoDays'), 'reports');
    return this.get('twoDays')[index].reports;
  }),


  nowWazers: computed('twoDaysLine', function () {
    const arr = this.get('twoDaysLine.datasets')[0].data;
    const now = arr[arr.length - 1];
    return (!now) ? 0 : now;
  }),

  nowReports: computed('twoDaysLine', function () {
    const arr = this.get('twoDaysLine.datasets')[1].data;
    const now = arr[arr.length - 1];
    return (!now) ? 0 : now;
  }),

  maxIndex: function (data, type) {
    let max   = 0,
        index = 0;
    data.forEach((item, i) => {
      if (max <= item[type]) {
        max   = item[type];
        index = i;
      }
    });
    return index;
  },

  getData: function () {
    const city = this.get('city_id');
    const url  = 'http://stats.waze.su/data.php?a=city&format=json';

    this.set('load', true);

    const twoDays = $.getJSON(`${url}&type=1&id=${city}`)
                     .then(data => {
                       this.set('twoDays', data.stats);
                     });

    const week = $.getJSON(`${url}&type=7&id=${city}`)
                  .then(data => {
                    this.set('week', data.stats);
                  });

    const mounth = $.getJSON(`${url}&type=31&id=${city}`)
                    .then(data => {
                      this.set('mounth', data.stats);
                    });

    const year = $.getJSON(`${url}&type=365&id=${city}`)
                  .then(data => {
                    this.set('year', data.stats);
                  });

    const promises = [twoDays, week, mounth, year];

    RSVP.all(promises)
        .then(() => {
          this.set('load', false);
        });
  },

  actions: {
    refreshData: function () {
      this.getData();
    }
  },

});
