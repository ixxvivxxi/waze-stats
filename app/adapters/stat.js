import DS from 'ember-data';
import Ember from 'ember';

const {
  get
} = Ember;

export default DS.RESTAdapter.extend({
  host: 'http://stats.waze.su/by',
  corsWithCredentials: true,
  namespace: '',
  buildURL: function() {
      var normalURL = this._super.apply(this, arguments);
      return normalURL += '.php', normalURL.replace('stats.php', 'data.php');
  },

  _ajaxRequest(options) {
    const success = options.success;

    options.success = function(payload, textStatus, jqXHR) {
      this.preProcess(payload, textStatus, jqXHR, options);
      return success.call(this, payload, textStatus, jqXHR);
    }

    return this._super(options)
  },

  preProcess(payload, textStatus, jqXHR, options) {
    const optionsId = +get(options, 'data.id');
    if (payload.stats instanceof Array &&  optionsId && get(options, 'data.a') === 'city') {
      payload.stats.forEach((i) => i.cityId = optionsId);
    }
  }
});
