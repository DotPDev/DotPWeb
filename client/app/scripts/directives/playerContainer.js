'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:player
 * @description
 * # player
 */
 angular.module('clientApp')
 .directive('playerContainer', function () {
     return {
         scope: {},
         templateUrl: 'views/playerContainer.html',
         controller: 'MainCtrl',
         controllerAs: 'vm',
         restrict: 'EA',
         bindToController: true
     };
 });
