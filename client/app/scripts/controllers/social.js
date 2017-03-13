'use strict';

/**
* @ngdoc function
* @name clientApp.controller:SocialCtrl
* @description
* # SocialCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('SocialCtrl', function ($scope, $state, $rootScope) {
    var vm = this;
    vm.close = closeAction;

    function closeAction() {
        $state.go('root.dashboard');
    }

});
