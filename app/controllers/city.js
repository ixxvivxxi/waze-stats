import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { all } from 'rsvp';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import { dateFormat } from 'waze-stats/utils/date';

export default Controller.extend({
  data: service(),

  maxWazersDay: computed('year.[]', function () {
    if (!this.year) {
      return null;
    }

    const online = Math.max(...this.year.map((item) => item.online));
    const day = this.year.find((item) => item.online === online);

    return {
      online,
      date: dateFormat.format(day.time),
    };
  }),

  maxWazersTwoDays: computed('twoDays.[]', function () {
    if (!this.twoDays) {
      return null;
    }

    return Math.max(...this.twoDays.map((item) => item.online));
  }),

  nowWazers: computed('twoDays', function () {
    return this.get('twoDays.lastObject.online') || 0;
  }),

  fetchData: task(function* () {
    yield all([
      this.fetchTwoDays.perform(),
      this.fetchWeek.perform(),
      this.fetchMounth.perform(),
      this.fetchYear.perform(),
    ]);
  }),

  fetchTwoDays: task(function* () {
    const twoDays = yield this.data.fetchData.perform(this.cityId, 1);
    this.set('twoDays', twoDays);
  }),

  fetchWeek: task(function* () {
    const week = yield this.data.fetchData.perform(this.cityId, 7);
    this.set('week', week);
  }),

  fetchMounth: task(function* () {
    const mounth = yield this.data.fetchData.perform(this.cityId, 31);
    this.set('mounth', mounth);
  }),

  fetchYear: task(function* () {
    const year = yield this.data.fetchData.perform(this.cityId, 365);
    this.set('year', year);
  }),
});
