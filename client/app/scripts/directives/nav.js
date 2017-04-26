'use strict';

/**
 * @ngdoc directive
 * @name clientApp.directive:player
 * @description
 * # player
 */
 angular.module('clientApp')
 .controller('NavCtrl', function ($window, DotpLoaderSvc) {
     var vm = this;
     vm.handleNavClick = handleNavClick;
     vm.handleShareClick = handleShareClick;
     vm.animateNav = animateNav;
     vm.isNavOpen = false;
     vm.isShareOpen = false;

     function handleNavClick() {
       vm.isNavOpen = !vm.isNavOpen;
     }

     function handleShareClick() {
       vm.isShareOpen = !vm.isShareOpen;
     }

     function animateNav(str) {
       DotpLoaderSvc.startLoader();
     }

 })
 .directive('navbar', function () {
     return {
         scope: {},
         templateUrl: 'views/nav.html',
         controller: 'NavCtrl',
         controllerAs: 'vm',
         restrict: 'EA',
         bindToController: true
     };
 });
