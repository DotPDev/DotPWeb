'use strict';

	/**
 	 * @ngdoc function
 	 * @name clientApp.controller:AboutCtrl
 	 * @description
 	 * # AboutCtrl
 	 * Controller of the clientApp
 	 */
angular.module('clientApp')
  .controller('HomeCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;

  });
