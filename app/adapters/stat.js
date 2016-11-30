import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://stats.waze.su/by',
  corsWithCredentials: true,
    namespace: '',
    buildURL: function() {
        var normalURL = this._super.apply(this, arguments);
        return normalURL += '.php', normalURL.replace('stats.php', 'data.php');
    }
});
