// Karma configuration
// Generated on 2017-02-09

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/firebase/firebase.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/mockfirebase/browser/mockfirebase.js',
      'bower_components/videogular/videogular.js',
      'bower_components/videogular-controls/vg-controls.js',
      'bower_components/videogular-buffering/vg-buffering.js',
      'bower_components/videogular-overlay-play/vg-overlay-play.js',
      'bower_components/videogular-poster/vg-poster.js',
      'bower_components/videogular-ima-ads/vg-ima-ads.js',
      'bower_components/waypoints/waypoints.js',
      'bower_components/SHA-1/sha1.js',
      'bower_components/angulartics/src/angulartics.js',
      'bower_components/angulartics/src/angulartics-adobe.js',
      'bower_components/angulartics/src/angulartics-chartbeat.js',
      'bower_components/angulartics/src/angulartics-cnzz.js',
      'bower_components/angulartics/src/angulartics-flurry.js',
      'bower_components/angulartics/src/angulartics-ga-cordova.js',
      'bower_components/angulartics/src/angulartics-ga.js',
      'bower_components/angulartics/src/angulartics-gtm.js',
      'bower_components/angulartics/src/angulartics-kissmetrics.js',
      'bower_components/angulartics/src/angulartics-mixpanel.js',
      'bower_components/angulartics/src/angulartics-piwik.js',
      'bower_components/angulartics/src/angulartics-scroll.js',
      'bower_components/angulartics/src/angulartics-segmentio.js',
      'bower_components/angulartics/src/angulartics-splunk.js',
      'bower_components/angulartics/src/angulartics-woopra.js',
      'bower_components/angulartics/src/angulartics-marketo.js',
      'bower_components/angulartics/src/angulartics-intercom.js',
      'bower_components/videogular-angulartics/vg-analytics.js',
      'bower_components/angular-media-queries/match-media.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-moment/angular-moment.js',
      'bower_components/angular-socialshare/dist/angular-socialshare.min.js',
      'bower_components/vsGoogleAutocomplete/dist/vs-google-autocomplete.js',
      'bower_components/vsGoogleAutocomplete/dist/vs-autocomplete-validator.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
