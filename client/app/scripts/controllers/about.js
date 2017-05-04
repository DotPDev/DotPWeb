'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;

    function navigateAbout(str) {
      console.log(str);
      vm.selectedSection = str;
    }

    function getActiveState(str) {
      if (str == vm.selectedSection) {
        return 'active';
      }
    }

    // function handleScrollBars() {
    //   [].forEach.call(document.querySelectorAll('.about-page'), function (el) {
    //     Ps.initialize(el);
    //   });
    // }

    // handleScrollBars();

    return {
      getActiveState: getActiveState,
      navigateAbout: navigateAbout
    };
  });
