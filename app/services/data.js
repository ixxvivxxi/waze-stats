import Service from '@ember/service';
import { task } from 'ember-concurrency';

export default Service.extend({
  url: 'https://stats.waze.su/data.php?a=city&format=json',

  fetchData: task(function*(id, type) {
    const url = new URL(this.url);
    url.search = new URLSearchParams({
      id,
      type,
      a: 'city',
      format: 'json',
    });

    try {
      const response = yield fetch(url);
      const remoteData = yield response.json();
      return remoteData.stats;
    } catch (error) {
      return [{ time: Date.getTime(), online: 0, reports: 0 }];
    }
  }),
});
