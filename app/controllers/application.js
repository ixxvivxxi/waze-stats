import Controller from '@ember/controller';
import $ from 'jquery';
import { CITIES } from 'waze-stats/config';

export default Controller.extend({
  cities: CITIES,
  
  actions: {
    toogleSidebar() {
      $('.ui.sidebar').sidebar('toggle');
    },
  },
});
