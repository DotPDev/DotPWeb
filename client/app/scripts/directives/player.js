'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:player
 * @description
 * # player
 */
 angular.module('clientApp')
 .directive('player', function () {
     return {
         scope: {},
         templateUrl: 'views/player.html',
         controller: 'PlayerCtrl',
         controllerAs: 'vm',
         restrict: 'EA',
         bindToController: true
     };
 });
