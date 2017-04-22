'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DotpeepsCtrl
 * @description
 * # DotpeepsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DotpLoaderCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var loadingContainer = document.getElementById("dotp-loader-container");
    function loadPage() {
      loadingContainer.className += " loading";
    }

    function resetLoader() {
      loadingContainer.className += " reset";
    }

    function startLoader() {
      loadingContainer.className = "ng-scope";
    }

    setTimeout(loadPage, 1000);
    setTimeout(resetLoader, 2500);
  });
