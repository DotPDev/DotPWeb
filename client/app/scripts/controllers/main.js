'use strict';

/**
* @ngdoc function
* @name clientApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('MainCtrl', function ($http, feedManager, utils) {
    var vm = this;
    vm.feed = {};

    function init() {
        var page = parseInt(utils.getParameterByName('page'));

        if (!page) {
            page = 1;
        }
        getFeed(page);
    }

    function getFeed(page) {
        feedManager.parseFeed(page).then(function(response) {
            console.log(response);
            vm.feed = response;
        }).catch(function(error) {
            console.log(error);
        });
    }


    init();
});
