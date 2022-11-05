import Route from '@ember/routing/route';
import { CITIES } from 'waze-stats/config';

export default class CityRoute extends Route {
  model({ cityId }) {
    return CITIES.find((city) => +city.id === +cityId);
  }
}
