'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DotpeepsCtrl
 * @description
 * # DotpeepsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DotpLoaderCtrl', function (DotpLoaderSvc) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    DotpLoaderSvc.startLoader();
  });
