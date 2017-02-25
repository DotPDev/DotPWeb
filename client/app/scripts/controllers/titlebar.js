'use strict';

/**
* @ngdoc function
* @name clientApp.controller:TitlebarCtrl
* @description
* # TitlebarCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('TitlebarCtrl', function ($scope, auth, $window, $state, screenSize) {
    var vm = this;
    vm.user = auth.getAuth();
    vm.signOut = signOut;
    vm.isShowingLogin = false;
    vm.goToLogin = goToLogin;
    vm.isCollapsed = false;
    vm.slideNavPanel = false;
    vm.clickPower = clickPower;
    screenSize.rules = {
        smartphones: 'only screen and (max-width: 568px)'
    };

    function init() {
        trackViewSize();
    }

    function clickPower() {
        if (screenSize.is('smartphones')) {
            //add class that shows the nav in mobile
            vm.slideNavPanel = !vm.slideNavPanel;
        } else {
            vm.isShowingLogin = !vm.isShowingLogin;
        }
    }

    function trackViewSize() {
        if (screenSize.is('smartphones')) {
            vm.isCollapsed = true;
        }
        screenSize.on('smartphones', function(isMatch){
            vm.isCollapsed = isMatch;
        });
    }

    function goToLogin() {
        vm.isShowingLogin = false;
        $state.go('root.login');
    }

    function signOut() {
        vm.isShowingLogin = false;
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

    init();
});
