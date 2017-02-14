'use strict';

/**
* @ngdoc function
* @name clientApp.controller:TitlebarCtrl
* @description
* # TitlebarCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('TitlebarCtrl', function (auth, $window) {
    var vm = this;
    vm.user = auth.getAuth();
    vm.signOut = auth.signOut;

    $window.firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            vm.user = user;
        } else {
            vm.user = null;
        }
    });
});
