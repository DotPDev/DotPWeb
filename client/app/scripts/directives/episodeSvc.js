'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:player
 * @description
 * # player
 */
 angular.module('clientApp')
 .directive('episodes', function () {
     return {
         scope: {},
         templateUrl: 'views/episodes.html',
         controller: 'MainCtrl',
         controllerAs: 'vm',
         restrict: 'EA',
         bindToController: true
     };
 });
