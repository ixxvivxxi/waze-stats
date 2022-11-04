import Controller from '@ember/controller';
import { CITIES } from 'waze-stats/config';

export default Controller.extend({
  cities: CITIES,
});
