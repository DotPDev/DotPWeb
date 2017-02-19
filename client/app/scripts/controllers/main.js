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
    vm.page = 1;
    vm.links = {
        next: "/",
        goNext: goNext,
        prev: "/",
        goPrev: goPrev
    };

    function init() {
        vm.page = parseInt(utils.getParameterByName('page'));

        if (!vm.page) {
            vm.page = 1;
        }
        setPageLinks();
        getFeed();
    }

    function setPageLinks() {
        if (vm.page === 1) {
            vm.links.next = "/?page=" + (vm.page + 1);
            vm.links.prev = "/";
        } else {
            vm.links.next = "/?page=" + (vm.page + 1);
            vm.links.prev = "/?page=" + (vm.page - 1);
        }
    }

    function goNext() {
        //HACK - timeout to prevent error with 2 way binding
        setTimeout(function() {
            vm.page += 1;
            setPageLinks();
            getFeed();
        },1);

    }

    function goPrev() {
        //HACK - timeout to prevent error with 2 way binding
        setTimeout(function() {
            if (vm.page > 1) {
                vm.page -= 1;
                setPageLinks();
                getFeed();
            }
        },1);
    }

    function getFeed() {
        feedManager.parseFeed(vm.page).then(function(response) {
            console.log(response);
            vm.feed = response;
        }).catch(function(error) {
            console.log(error);
        });
    }


    init();
});
