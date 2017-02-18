'use strict';

/**
* @ngdoc function
* @name clientApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('MainCtrl', function ($http, feedManager, d2ApiSvc) {
    var vm = this;
    vm.feed = {};

    function init() {
        getFeed();
        //getUserHistory("386717081");
        //getLeagueListings();
    }

    function getFeed() {
        feedManager.parseFeed().then(function(response) {
            console.log(response);
            vm.feed = response;
        }).catch(function(error) {
            console.log(error);
        });
    }

    function getUserHistory(id) {
        d2ApiSvc.getUserHistory(id).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }

    function getLeagueListings() {
        d2ApiSvc.getLeagueListings().then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }


    init();
});
