import Service from '@ember/service';
import { task } from 'ember-concurrency';

const STATS_URL = 'https://stats.waze.su/data.php'

export default Service.extend({
  fetchData: task(function*(id, type) {
    const url = new URL(STATS_URL);
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
