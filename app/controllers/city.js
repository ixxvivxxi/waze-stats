import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { all } from 'rsvp';
import { dateFormat } from 'waze-stats/utils/date';

export default class CityController extends Controller {
  @service('data')
  dataService;

  interval = null;

  @tracked twoDays = [];
  @tracked week = [];
  @tracked mounth = [];
  @tracked year = [];

  get maxWazersDay() {
    if (!this.year.length) {
      return null;
    }

    const online = Math.max(...this.year.map((item) => item.online));
    const day = this.year.find((item) => item.online === online);

    return {
      online,
      date: dateFormat.format(day.time),
    };
  }

  get maxWazersTwoDays() {
    if (!this.twoDays) {
      return null;
    }

    return Math.max(...this.twoDays.map((item) => item.online));
  }

  get nowWazers() {
    return this.get('twoDays.lastObject.online') || 0;
  }

  fetchData = task(this, async () => {
    await all([
      this.fetchTwoDays.perform(),
      this.fetchWeek.perform(),
      this.fetchMounth.perform(),
      this.fetchYear.perform(),
    ]);
  });

  fetchTwoDays = task(this, async () => {
    const twoDays = await this.dataService.fetchData(this.model.id, 1);
    this.twoDays = twoDays;
  });

  fetchWeek = task(this, async () => {
    const week = await this.dataService.fetchData(this.model.id, 7);
    this.week = week;
  });

  fetchMounth = task(this, async () => {
    const mounth = await this.dataService.fetchData(this.model.id, 31);
    this.mounth = mounth;
  });

  fetchYear = task(this, async () => {
    const year = await this.dataService.fetchData(this.model.id, 365);
    this.year = year;
  });

  @action
  onInit() {
    this.fetchData.perform();

    this.interval = setInterval(() => {
      this.fetchTwoDays.perform();
    }, 600000);
  }

  @action
  onDestroy() {
    clearInterval(this.interval);
  }
}
