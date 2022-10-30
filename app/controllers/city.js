import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { all } from 'rsvp';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

const dateFormat = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
});

const timeFormat = new Intl.DateTimeFormat('ru-RU', {
  hour: 'numeric',
  minute: 'numeric',
});

const timezoneOffset = new Date().getTimezoneOffset() * 60 * 60;

const lineConfig = {
  fill: false,
  lineTension: 0.1,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  spanGaps: false,
  nearest: false,
  data: [],
};

const onlineConfig = {
  label: 'Вейзеры',
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
};

const reportsConfig = {
  label: 'Отчеты',
  backgroundColor: 'rgba(255,235,60,0.4)',
  borderColor: 'rgba(255,235,60,1)',
  pointBorderColor: 'rgba(255,235,60,1)',
  pointHoverBackgroundColor: 'rgba(255,235,60,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
};

const averageConfig = {
  label: 'Среднее',
  spanGaps: true,
  backgroundColor: 'rgba(33,133,208,0.4)',
  borderColor: 'rgba(33,133,208,1)',
  pointBorderColor: 'rgba(33,133,208,1)',
  pointHoverBackgroundColor: 'rgba(33,133,208,1)',
  pointHoverBorderColor: 'rgba(33,133,208,1)',
};

export default Controller.extend({
  data: service(),

  getLineData(data) {
    const lineData = {
      labels: [],
      datasets: [
        { ...onlineConfig, ...lineConfig },
        { ...reportsConfig, ...lineConfig },
      ],
    };
    if (data) {
      const days = Math.round(
        (data[data.length - 1].time - data[0].time) / 86400000
      );

      const labels = [];
      const online = [];
      const average = [];
      const reports = [];

      let firstIndex = 0,
        onlineInWeek = 0;

      data.forEach((item, index) => {
        online.push(item.online);
        reports.push(item.reports);
        const time = item.time + timezoneOffset;
        const date = new Date(time);

        labels.push(getLabel(index, days, time));

        if (days === 365) {
          onlineInWeek += item.online;
          if (date.getDay() === 0) {
            for (let i = firstIndex; i < index; i++) {
              average.push(null);
            }
            average.push(Math.round(onlineInWeek / (index - firstIndex + 1)));
            firstIndex = index + 1;
            onlineInWeek = 0;
          }
        }
      });
      lineData.datasets[0].data = online;
      lineData.datasets[1].data = reports;
      lineData.labels = labels;

      if (days === 365) {
        lineData.datasets.push(Object.assign({}, lineConfig, averageConfig));
        lineData.datasets[2].data = average;
      }
    }

    return lineData;
  },

  twoDaysLine: computed('twoDays.[]', function () {
    return this.getLineData(this.twoDays);
  }),

  weekLine: computed('week.[]', function () {
    return this.getLineData(this.week);
  }),

  mounthLine: computed('mounth.[]', function () {
    return this.getLineData(this.mounth);
  }),

  yearLine: computed('year.[]', function () {
    return this.getLineData(this.year);
  }),

  maxWazers: computed('year.[]', function () {
    if (!this.year) {
      return '~';
    }

    const index = this.maxIndex(this.year, 'online');
    return this.year[index].online;
  }),

  maxWazersDate: computed('year.[]', function () {
    if (!this.year) {
      return '';
    }

    const index = this.maxIndex(this.year, 'online');
    return dateFormat.format(this.year[index].time);
  }),

  maxReports: computed('year.[]', function () {
    if (!this.year) {
      return '~';
    }

    const index = this.maxIndex(this.year, 'reports');
    return this.year[index].reports;
  }),

  maxReportsDate: computed('year.[]', function () {
    if (!this.year) {
      return '';
    }

    const index = this.maxIndex(this.year, 'reports');
    return dateFormat.format(this.year[index].time);
  }),

  maxWazersTwoDays: computed('twoDays.[]', function () {
    if (!this.twoDays) {
      return '~';
    }

    const index = this.maxIndex(this.twoDays, 'online');
    return this.twoDays[index].online;
  }),

  maxReportsTwoDays: computed('twoDays.[]', function () {
    if (!this.twoDays) {
      return '~';
    }

    const index = this.maxIndex(this.twoDays, 'reports');
    return this.twoDays[index].reports;
  }),

  nowWazers: computed('twoDays', function () {
    return this.get('twoDays.lastObject.online') || 0;
  }),

  nowReports: computed('twoDays', function () {
    return this.get('twoDays.lastObject.reports') || 0;
  }),

  maxIndex(data, type) {
    let max = 0,
      index = 0;
    data.forEach((item, i) => {
      if (max <= item[type]) {
        max = item[type];
        index = i;
      }
    });
    return index;
  },

  fetchData: task(function* () {
    yield all([
      this.fetchTwoDays.perform(),
      this.fetchWeek.perform(),
      this.fetchMounth.perform(),
      this.fetchYear.perform(),
    ]);
  }),

  fetchTwoDays: task(function* () {
    const twoDays = yield this.data.fetchData.perform(this.city_id, 1);
    this.set('twoDays', twoDays);
  }),

  fetchWeek: task(function* () {
    const week = yield this.data.fetchData.perform(this.city_id, 7);
    this.set('week', week);
  }),

  fetchMounth: task(function* () {
    const mounth = yield this.data.fetchData.perform(this.city_id, 31);
    this.set('mounth', mounth);
  }),

  fetchYear: task(function* () {
    const year = yield this.data.fetchData.perform(this.city_id, 365);
    this.set('year', year);
  }),

  actions: {
    refreshData() {
      this.fetchData.perform();
    },
  },
});

function getLabel(index, days, time) {
  if (index === 0 || days === 365) {
    return dateFormat.format(time);
  }

  if (time % 3600 !== 0) {
    return dateFormat.format(time);
  }

  return timeFormat.format(time);
}
