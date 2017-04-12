'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:player
 * @description
 * # player
 */
 angular.module('clientApp')
 .directive('cart', function () {
     return {
         scope: {},
         templateUrl: 'views/cart.html',
         controller: 'StoreCtrl',
         controllerAs: 'vm',
         restrict: 'EA',
         bindToController: true
     };
 });
