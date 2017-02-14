'use strict';

/**
* @ngdoc function
* @name clientApp.controller:TitlebarCtrl
* @description
* # TitlebarCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('TitlebarCtrl', function ($scope, auth, $window, $state) {
    var vm = this;
    vm.user = auth.getAuth();
    vm.signOut = signOut;

    function signOut() {
        auth.signOut();
        $state.go('root.dashboard');
    }

    $window.firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            vm.user = user;
            $scope.$apply();
        } else {
            vm.user = null;
            $scope.$apply();
        }
    });
});
