/* eslint-env node */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/semantic-ui/dist/semantic.min.css');
  //app.import('bower_components/semantic-ui/dist/components/site.min.css');
  app.import("bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.woff2", { destDir: "assets/themes/default/assets/fonts" });
  app.import("bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.woff", { destDir: "assets/themes/default/assets/fonts" });
  app.import("bower_components/semantic-ui/dist/themes/default/assets/fonts/icons.ttf", { destDir: "assets/themes/default/assets/fonts" });

  return app.toTree();
};
