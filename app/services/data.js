import Service from '@ember/service';
const STATS_URL = 'https://stats.waze.su/data.php';

export default class DataService extends Service {
  async fetchData(id, type) {
    const url = new URL(STATS_URL);

    url.search = new URLSearchParams({
      id,
      type,
      a: 'city',
      format: 'json',
    });

    try {
      const response = await fetch(url);
      const remoteData = await response.json();
      return remoteData.stats;
    } catch (error) {
      return [{ time: Date.getTime(), online: 0 }];
    }
  }
}
