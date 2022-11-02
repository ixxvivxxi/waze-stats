import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { all } from 'rsvp';
import { task } from 'ember-concurrency';
import { CITIES } from 'waze-stats/config';

const DEFAULT_CHARTDATA = {
  datasets: [
    {
      label: '',
      data: [1],
      backgroundColor: ['#838383'],
    },
  ],
  labels: ['нет данных'],
};

export default class IndexChartComponent extends Component {
  @service('data')
  dataService;

  interval = null;

  @tracked
  citiesData = [];

  @tracked isPie = true;

  get options() {
    return {
      legend: {
        display: this.isPie,
      },
      scales: this.isPie
        ? {}
        : {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
    };
  }

  get period() {
    if (this.args.period) {
      return this.args.period;
    }

    return 1;
  }

  get chartData() {
    if (this.citiesData.length === 0) {
      return DEFAULT_CHARTDATA;
    }

    const data = this.citiesData.sortBy('value').reverse();

    return {
      datasets: [
        {
          label: '',
          data: data.map((item) => item.value),
          backgroundColor: data.map((item) => item.color),
        },
      ],
      labels: data.map((item) => item.name),
    };
  }

  fetchData = task(this, async () => {
    const citiesData = await all(
      CITIES.map((city) =>
        this.dataService.fetchData
          .perform(city.id, this.period)
          .then((data) => {
            const value =
              this.period === 1
                ? data[data.length - 1].online
                : Math.max(...data.map((item) => item.online));
            return {
              ...city,
              value,
            };
          })
      )
    );

    this.citiesData = citiesData.filter((item) => item.value);
  });

  @action
  async onInit() {
    await this.fetchData.perform();

    if (this.args.autoUpdate) {
      this.interval = setInterval(() => this.fetchData.perform(), 600000);
    }
  }

  @action
  onDestroy() {
    clearInterval(this.interval);
  }
}
