import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({

  actions: {

    toogleSidebar() {
      $('.ui.sidebar').sidebar('toggle');
    },

  }

});
