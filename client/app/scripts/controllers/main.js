'use strict';

/**
* @ngdoc function
* @name clientApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('MainCtrl', function ($scope, $http, $rootScope, feedManager, utils) {
    var vm = this;
    vm.feed = {};
    vm.page = 1;
    vm.links = {
        next: "/",
        prev: "/"
    };
    vm.stripHtml = stripHtml;
    vm.getImage = getImage;
    vm.startPodcast = startPodcast;

    function init() {
        vm.page = parseInt(utils.getParameterByName('page'));

        if (!vm.page) {
            vm.page = 1;
        }
        setPageLinks();
        getFeed();
    }

    function getImage(date) {
        var dateObj = new Date(date);
        var day = dateObj.getDay();
        if (day === 2) {
            return '../images/tues.png';
        } else if (day === 4) {
            return '../images/thurs.png';
        } else {
            return '../images/generic.png';
        }
    }

    function stripHtml(htmlString) {
        var newSummary = htmlString.replace('<h2>Defense of the Patience - A Dota 2 Podcast</h2> ', '');
        return newSummary;
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

    function startPodcast(episode) {
        $rootScope.$broadcast('player-play', episode);
    }

    $scope.$on('main-next', function(event, args) {
        goNext();
    });

    $scope.$on('main-prev', function(event, args) {
        goPrev();
    });



    init();
});
