"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('stats/adapters/stat', ['exports', 'ember-data'], function (exports, _emberData) {
    exports['default'] = _emberData['default'].RESTAdapter.extend({
        host: 'http://stats.waze.su/by',
        corsWithCredentials: true,
        namespace: '',
        buildURL: function buildURL() {
            var normalURL = this._super.apply(this, arguments);
            return normalURL += '.php', normalURL.replace('stats.php', 'data.php');
        }
    });
});
define('stats/app', ['exports', 'ember', 'stats/resolver', 'ember-load-initializers', 'stats/config/environment'], function (exports, _ember, _statsResolver, _emberLoadInitializers, _statsConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _statsConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _statsConfigEnvironment['default'].podModulePrefix,
    Resolver: _statsResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _statsConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('stats/components/ember-chart', ['exports', 'ember-cli-chartjs/components/ember-chart'], function (exports, _emberCliChartjsComponentsEmberChart) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliChartjsComponentsEmberChart['default'];
    }
  });
});
define('stats/components/ui-accordion-section', ['exports', 'ember-cli-semantic-ui/components/ui-accordion-section'], function (exports, _emberCliSemanticUiComponentsUiAccordionSection) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiAccordionSection['default'];
    }
  });
});
define('stats/components/ui-accordion', ['exports', 'ember-cli-semantic-ui/components/ui-accordion'], function (exports, _emberCliSemanticUiComponentsUiAccordion) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiAccordion['default'];
    }
  });
});
define('stats/components/ui-checkbox', ['exports', 'ember-cli-semantic-ui/components/ui-checkbox'], function (exports, _emberCliSemanticUiComponentsUiCheckbox) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiCheckbox['default'];
    }
  });
});
define('stats/components/ui-dimmable', ['exports', 'ember-cli-semantic-ui/components/ui-dimmable'], function (exports, _emberCliSemanticUiComponentsUiDimmable) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiDimmable['default'];
    }
  });
});
define('stats/components/ui-dropdown', ['exports', 'ember-cli-semantic-ui/components/ui-dropdown'], function (exports, _emberCliSemanticUiComponentsUiDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiDropdown['default'];
    }
  });
});
define('stats/components/ui-form', ['exports', 'ember-cli-semantic-ui/components/ui-form'], function (exports, _emberCliSemanticUiComponentsUiForm) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiForm['default'];
    }
  });
});
define('stats/components/ui-modal', ['exports', 'ember-cli-semantic-ui/components/ui-modal'], function (exports, _emberCliSemanticUiComponentsUiModal) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiModal['default'];
    }
  });
});
define('stats/components/ui-popup', ['exports', 'ember-cli-semantic-ui/components/ui-popup'], function (exports, _emberCliSemanticUiComponentsUiPopup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiPopup['default'];
    }
  });
});
define('stats/components/ui-progress', ['exports', 'ember-cli-semantic-ui/components/ui-progress'], function (exports, _emberCliSemanticUiComponentsUiProgress) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiProgress['default'];
    }
  });
});
define('stats/components/ui-radio-button', ['exports', 'ember-cli-semantic-ui/components/ui-radio-button'], function (exports, _emberCliSemanticUiComponentsUiRadioButton) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiRadioButton['default'];
    }
  });
});
define('stats/components/ui-radio-collection', ['exports', 'ember-cli-semantic-ui/components/ui-radio-collection'], function (exports, _emberCliSemanticUiComponentsUiRadioCollection) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiRadioCollection['default'];
    }
  });
});
define('stats/components/ui-shape', ['exports', 'ember-cli-semantic-ui/components/ui-shape'], function (exports, _emberCliSemanticUiComponentsUiShape) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiShape['default'];
    }
  });
});
define('stats/components/ui-sticky', ['exports', 'ember-cli-semantic-ui/components/ui-sticky'], function (exports, _emberCliSemanticUiComponentsUiSticky) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliSemanticUiComponentsUiSticky['default'];
    }
  });
});
define('stats/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({});
});
define('stats/controllers/city', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {
  exports['default'] = _ember['default'].Controller.extend({
    wazersDataset: {
      label: 'Вейзеры',
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      spanGaps: false
    },
    reportsDataset: {
      label: 'Отчеты',
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(255,235,60,0.4)",
      borderColor: "rgba(255,235,60,1)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgba(255,235,60,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(255,235,60,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      spanGaps: false
    },

    twoDaysLine: _ember['default'].computed('twoDays.[]', function () {
      var model = this.get('twoDays');
      var wazers = Object.assign({}, this.get('wazersDataset'));
      wazers.data = model.map(function (item) {
        return item.get('online');
      });

      var reports = Object.assign({}, this.get('reportsDataset'));
      reports.data = model.map(function (item) {
        return item.get('reports');
      });
      return {
        labels: model.map(function (item) {
          return (0, _moment['default'])(item.get('time')).utcOffset(0).format('DD.MM HH:mm');
        }),
        datasets: [wazers, reports]
      };
    }),
    weekLine: _ember['default'].computed('week.[]', function () {
      var model = this.get('week');
      var wazers = Object.assign({}, this.get('wazersDataset'));
      wazers.data = model.map(function (item) {
        return item.get('online');
      });

      var reports = Object.assign({}, this.get('reportsDataset'));
      reports.data = model.map(function (item) {
        return item.get('reports');
      });
      return {
        labels: model.map(function (item) {
          return (0, _moment['default'])(item.get('time')).utcOffset(0).format('DD.MM HH:mm');
        }),
        datasets: [wazers, reports]
      };
    }),
    mounthLine: _ember['default'].computed('mounth.[]', function () {
      var model = this.get('mounth');
      var wazers = Object.assign({}, this.get('wazersDataset'));
      wazers.data = model.map(function (item) {
        return item.get('online');
      });

      var reports = Object.assign({}, this.get('reportsDataset'));
      reports.data = model.map(function (item) {
        return item.get('reports');
      });
      return {
        labels: model.map(function (item) {
          return (0, _moment['default'])(item.get('time')).utcOffset(0).format('DD.MM.YYYY');
        }),
        datasets: [wazers, reports]
      };
    }),
    yearLine: _ember['default'].computed('year.[]', function () {
      var model = this.get('year');
      var wazers = Object.assign({}, this.get('wazersDataset'));
      wazers.data = model.map(function (item) {
        return item.get('online');
      });

      var reports = Object.assign({}, this.get('reportsDataset'));
      reports.data = model.map(function (item) {
        return item.get('reports');
      });
      return {
        labels: model.map(function (item) {
          return (0, _moment['default'])(item.get('time')).utcOffset(0).format('DD.MM.YYYY');
        }),
        datasets: [wazers, reports]
      };
    }),
    maxWazers: _ember['default'].computed('yearLine.labels.[]', function () {
      var max = Math.max.apply(null, this.get('yearLine.datasets')[0].data);
      return max === -Infinity ? '~' : max;
    }),
    maxReports: _ember['default'].computed('yearLine.labels.[]', function () {
      var max = Math.max.apply(null, this.get('yearLine.datasets')[1].data);
      return max === -Infinity ? '~' : max;
    }),
    nowWazers: _ember['default'].computed('twoDaysLine.labels.[]', function () {
      var arr = this.get('twoDaysLine.datasets')[0].data;
      var now = arr[arr.length - 1];
      return !now ? 0 : now;
    }),
    nowReports: _ember['default'].computed('twoDaysLine.labels.[]', function () {
      var arr = this.get('twoDaysLine.datasets')[1].data;
      var now = arr[arr.length - 1];
      return !now ? 0 : now;
    }),

    actions: {
      refreshData: function refreshData() {
        this.set('twoDays', this.store.query('stat', { 'a': 'city', 'id': this.get('city_id'), 'type': 1, 'format': 'json' }));
        this.set('week', this.store.query('stat', { 'a': 'city', 'id': this.get('city_id'), 'type': 7, 'format': 'json' }));
        this.set('mounth', this.store.query('stat', { 'a': 'city', 'id': this.get('city_id'), 'type': 31, 'format': 'json' }));
      }
    }
  });
});
define('stats/controllers/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    pieData: _ember['default'].computed('cities', function () {
      var piedata = {};
      piedata.labels = ['Минск', 'Брест', 'Витебск', 'Гомель', 'Гродно', 'Могилёв'];

      Promise.all([this.store.query('stat', { 'a': 'city', 'id': 59, 'type': 1, 'format': 'json' }), this.store.query('stat', { 'a': 'city', 'id': 65, 'type': 1, 'format': 'json' }), this.store.query('stat', { 'a': 'city', 'id': 67, 'type': 1, 'format': 'json' }), this.store.query('stat', { 'a': 'city', 'id': 64, 'type': 1, 'format': 'json' }), this.store.query('stat', { 'a': 'city', 'id': 66, 'type': 1, 'format': 'json' }), this.store.query('stat', { 'a': 'city', 'id': 68, 'type': 1, 'format': 'json' })]).then(function (values) {
        values.forEach(function (value) {
          console.log(value.get('lastObject').get('online'));
        });

        return 'готово';
      });
    })

  });
});
define('stats/helpers/app-version', ['exports', 'ember', 'stats/config/environment'], function (exports, _ember, _statsConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _statsConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('stats/helpers/moment-calendar', ['exports', 'ember', 'stats/config/environment', 'ember-moment/helpers/moment-calendar'], function (exports, _ember, _statsConfigEnvironment, _emberMomentHelpersMomentCalendar) {
  exports['default'] = _emberMomentHelpersMomentCalendar['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_statsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('stats/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _emberMomentHelpersMomentDuration) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersMomentDuration['default'];
    }
  });
});
define('stats/helpers/moment-format', ['exports', 'ember', 'stats/config/environment', 'ember-moment/helpers/moment-format'], function (exports, _ember, _statsConfigEnvironment, _emberMomentHelpersMomentFormat) {
  exports['default'] = _emberMomentHelpersMomentFormat['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_statsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('stats/helpers/moment-from-now', ['exports', 'ember', 'stats/config/environment', 'ember-moment/helpers/moment-from-now'], function (exports, _ember, _statsConfigEnvironment, _emberMomentHelpersMomentFromNow) {
  exports['default'] = _emberMomentHelpersMomentFromNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_statsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('stats/helpers/moment-to-now', ['exports', 'ember', 'stats/config/environment', 'ember-moment/helpers/moment-to-now'], function (exports, _ember, _statsConfigEnvironment, _emberMomentHelpersMomentToNow) {
  exports['default'] = _emberMomentHelpersMomentToNow['default'].extend({
    globalAllowEmpty: !!_ember['default'].get(_statsConfigEnvironment['default'], 'moment.allowEmpty')
  });
});
define('stats/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _emberMomentHelpersNow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberMomentHelpersNow['default'];
    }
  });
});
define('stats/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('stats/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('stats/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'stats/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _statsConfigEnvironment) {
  var _config$APP = _statsConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('stats/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('stats/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('stats/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('stats/initializers/export-application-global', ['exports', 'ember', 'stats/config/environment'], function (exports, _ember, _statsConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_statsConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _statsConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_statsConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('stats/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('stats/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('stats/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("stats/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('stats/models/stat', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    time: _emberData['default'].attr(''),
    online: _emberData['default'].attr('number'),
    reports: _emberData['default'].attr('number')
  });
});
define('stats/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('stats/router', ['exports', 'ember', 'stats/config/environment'], function (exports, _ember, _statsConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _statsConfigEnvironment['default'].locationType,
    rootURL: _statsConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('index', { path: '/' });
    this.route('city', { path: ':city_id' });
  });

  exports['default'] = Router;
});
define('stats/routes/application', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return [{
        id: 59,
        name: 'Минск',
        nowStats: []
      }, {
        id: 65,
        name: 'Брест',
        nowStats: []
      }, {
        id: 67,
        name: 'Витебск',
        nowStats: []
      }, {
        id: 64,
        name: 'Гомель',
        nowStats: []
      }, {
        id: 66,
        name: 'Гродно',
        nowStats: []
      }, {
        id: 68,
        name: 'Могилёв',
        nowStats: []
      }, {
        id: 71,
        name: 'Барановичи',
        nowStats: []
      }, {
        id: 69,
        name: 'Бобруйск',
        nowStats: []
      }, {
        id: 72,
        name: 'Борисов',
        nowStats: []
      }, {
        id: 74,
        name: 'Мозырь/Калинковичи',
        nowStats: []
      }, {
        id: 73,
        name: 'Молодечно',
        nowStats: []
      }, {
        id: 75,
        name: 'Пинск',
        nowStats: []
      }, {
        id: 76,
        name: 'Полоцк/Новополоцк',
        nowStats: []
      }, {
        id: 77,
        name: 'Солигорск',
        nowStats: []
      }];
    },
    setupController: function setupController(controller, model) {
      controller.set('cities', model);
    }
  });
});
define('stats/routes/city', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      return _ember['default'].RSVP.hash({
        city_id: params.city_id
      });
    },
    setupController: function setupController(controller, model) {
      var _this = this;

      controller.set('city_id', model.city_id);
      controller.set('twoDays', this.store.query('stat', { 'a': 'city', 'id': model.city_id, 'type': 1, 'format': 'json' }));
      controller.set('week', this.store.query('stat', { 'a': 'city', 'id': model.city_id, 'type': 7, 'format': 'json' }));
      controller.set('mounth', this.store.query('stat', { 'a': 'city', 'id': model.city_id, 'type': 31, 'format': 'json' }));
      controller.set('year', this.store.query('stat', { 'a': 'city', 'id': model.city_id, 'type': 365, 'format': 'json' }));

      controller.set('interval', setInterval(function () {
        controller.set('twoDays', _this.store.query('stat', { 'a': 'city', 'id': model.city_id, 'type': 1, 'format': 'json' }));
        controller.set('week', _this.store.query('stat', { 'a': 'city', 'id': model.city_id, 'type': 7, 'format': 'json' }));
        controller.set('mounth', _this.store.query('stat', { 'a': 'city', 'id': model.city_id, 'type': 31, 'format': 'json' }));
      }, 300000));
    },
    actions: {
      willTransition: function willTransition() {
        clearInterval(this.controller.get('interval'));
        return true;
      }
    }
  });
});
define('stats/routes/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    setupController: function setupController(controller) {
      controller.set('cities', this.modelFor('application'));
    }
  });
});
define('stats/serializers/stat', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].RESTSerializer.extend({
    primaryKey: 'time'
  });
});
define('stats/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define('stats/services/moment', ['exports', 'ember', 'stats/config/environment', 'ember-moment/services/moment'], function (exports, _ember, _statsConfigEnvironment, _emberMomentServicesMoment) {
  exports['default'] = _emberMomentServicesMoment['default'].extend({
    defaultFormat: _ember['default'].get(_statsConfigEnvironment['default'], 'moment.outputFormat')
  });
});
define("stats/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 2,
              "column": 60
            }
          },
          "moduleName": "stats/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "home icon");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.9.1",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 4
              },
              "end": {
                "line": 4,
                "column": 53
              }
            },
            "moduleName": "stats/templates/application.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["content", "city.name", ["loc", [null, [4, 4], [4, 53]]], 0, 0, 0, 0]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.9.1",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 2
            }
          },
          "moduleName": "stats/templates/application.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["block", "link-to", ["city", ["get", "city.id", ["loc", [null, [4, 31], [4, 38]]], 0, 0, 0, 0]], ["class", "item"], 0, null, ["loc", [null, [4, 4], [4, 53]]]]],
        locals: ["city"],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "stats/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui tiny secondary pointing menu");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "");
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["block", "link-to", ["index"], ["class", "item"], 0, null, ["loc", [null, [2, 2], [2, 72]]]], ["block", "each", [["get", "cities", ["loc", [null, [3, 10], [3, 16]]], 0, 0, 0, 0]], [], 1, null, ["loc", [null, [3, 2], [5, 11]]]], ["content", "outlet", ["loc", [null, [12, 0], [12, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("stats/templates/city", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "stats/templates/city.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui blue statistic");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "value");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "label");
        var el3 = dom.createTextNode("Вейзеров сейчас");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui yellow statistic");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "value");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "label");
        var el3 = dom.createTextNode("Отчетов сейчас");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui blue statistic");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "value");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "label");
        var el3 = dom.createTextNode("Максимум вейзеров за год");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ui yellow statistic");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "value");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "label");
        var el3 = dom.createTextNode("Максимум отчетов за год");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "style", "margin-right: 10px;");
        dom.setAttribute(el1, "class", "ui huge blue basic icon button right floated");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "class", "refresh icon");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Статистика за 2 дня (каждые 5 минут)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Статистика за неделю (каждые 15 минут)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Статистика за месяц (каждые 3 часа)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode("Статистика за год (каждый день)");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [8]);
        var morphs = new Array(10);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4, 1]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(fragment, [6, 1]), 0, 0);
        morphs[4] = dom.createElementMorph(element0);
        morphs[5] = dom.createMorphAt(fragment, 12, 12, contextualElement);
        morphs[6] = dom.createMorphAt(fragment, 16, 16, contextualElement);
        morphs[7] = dom.createMorphAt(fragment, 20, 20, contextualElement);
        morphs[8] = dom.createMorphAt(fragment, 24, 24, contextualElement);
        morphs[9] = dom.createMorphAt(fragment, 26, 26, contextualElement);
        return morphs;
      },
      statements: [["content", "nowWazers", ["loc", [null, [2, 21], [2, 34]]], 0, 0, 0, 0], ["content", "nowReports", ["loc", [null, [7, 21], [7, 35]]], 0, 0, 0, 0], ["content", "maxWazers", ["loc", [null, [12, 21], [12, 34]]], 0, 0, 0, 0], ["content", "maxReports", ["loc", [null, [17, 21], [17, 35]]], 0, 0, 0, 0], ["element", "action", ["refreshData"], [], ["loc", [null, [21, 8], [21, 32]]], 0, 0], ["inline", "ember-chart", [], ["type", "line", "data", ["subexpr", "@mut", [["get", "twoDaysLine", ["loc", [null, [26, 31], [26, 42]]], 0, 0, 0, 0]], [], [], 0, 0], "height", 350], ["loc", [null, [26, 0], [26, 55]]], 0, 0], ["inline", "ember-chart", [], ["type", "line", "data", ["subexpr", "@mut", [["get", "weekLine", ["loc", [null, [29, 31], [29, 39]]], 0, 0, 0, 0]], [], [], 0, 0], "height", 350], ["loc", [null, [29, 0], [29, 52]]], 0, 0], ["inline", "ember-chart", [], ["type", "line", "data", ["subexpr", "@mut", [["get", "mounthLine", ["loc", [null, [32, 31], [32, 41]]], 0, 0, 0, 0]], [], [], 0, 0], "height", 350], ["loc", [null, [32, 0], [32, 54]]], 0, 0], ["inline", "ember-chart", [], ["type", "line", "data", ["subexpr", "@mut", [["get", "yearLine", ["loc", [null, [35, 31], [35, 39]]], 0, 0, 0, 0]], [], [], 0, 0], "height", 350], ["loc", [null, [35, 0], [35, 52]]], 0, 0], ["content", "outlet", ["loc", [null, [37, 0], [37, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("stats/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.9.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "stats/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        return morphs;
      },
      statements: [["content", "pieData", ["loc", [null, [3, 0], [3, 11]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define('stats/utils/chart-object', ['exports', 'ember-cli-chartjs/utils/chart-object'], function (exports, _emberCliChartjsUtilsChartObject) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliChartjsUtilsChartObject['default'];
    }
  });
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('stats/config/environment', ['ember'], function(Ember) {
  var prefix = 'stats';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("stats/app")["default"].create({"name":"stats","version":"0.0.0+09a3cd10"});
}

/* jshint ignore:end */
//# sourceMappingURL=stats.map
