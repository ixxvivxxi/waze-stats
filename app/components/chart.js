import Component from '@glimmer/component';
import {
  dateFormat,
  timeFormat,
  timezoneOffset
} from 'waze-stats/utils/date';

const DAY_TIME = 86400000;

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

export default class ChartComponent extends Component {
  rawData = [];

  get isDateFormat() {
    return !!this.args.isDateFormat;
  }

  get period() {
    const data = this.args.data;

    if (data.length) {
      const minutes = (data[1].time - data[0].time) / 60000;

      if (minutes < 60) {
        return `каждые ${minutes} минут`;
      }

      const hours = minutes / 60;

      if (hours < 24) {
        return `каждые ${hours} часа`;
      }

      return `каждый день`;
    }

    return null;
  }

  get chartData() {
    const data = this.args.data;

    const lineData = {
      labels: [],
      datasets: [{ ...onlineConfig, ...lineConfig }],
    };

    if (data) {
      const labels = [];
      const online = [];

      data.forEach((item, index) => {
        online.push(item.online);
        const time = item.time + timezoneOffset;

        if (index === 0 || this.isDateFormat || item.time % DAY_TIME === 0) {
          labels.push(dateFormat.format(time));
        } else {
          labels.push(timeFormat.format(time));
        }
      });

      lineData.datasets[0].data = online;
      lineData.labels = labels;
    }

    return lineData;
  }
}
