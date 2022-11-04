import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { CITIES } from 'waze-stats/config';

export default class MenuComponent extends Component {
  cities = CITIES;

  @tracked isSidebarOpen = false;
}
