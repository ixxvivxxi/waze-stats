import Controller from '@ember/controller';
import { CITIES } from 'waze-stats/config';

export default class ApplicationController extends Controller {
  cities = CITIES;
}
