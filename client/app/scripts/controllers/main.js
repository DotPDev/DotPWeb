'use strict';

/**
* @ngdoc function
* @name clientApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('MainCtrl', function ($http, feedManager) {
    var vm = this;
    vm.feed = {};

    function init() {
        getFeed();
    }

    function getFeed() {
        feedManager.parseFeed().then(function(response) {
            console.log(response);
            vm.feed = response;
        }).catch(function(error) {
            console.log(error);
        });
    }


    init();
});
