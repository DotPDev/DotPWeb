'use strict';

/**
* @ngdoc function
* @name clientApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('MainCtrl', function ($scope, $http, $rootScope, feedManager, utils, uiState) {
    var vm = this;
    vm.feed = {};
    vm.page = 1;
    vm.links = {
        next: "/",
        prev: "/"
    };
    vm.states = {};
    vm.states.podcastButton = "isPodcastOpen";
    vm.states.podcastPlaying = "isPodcastPlaying";
    vm.stripHtml = stripHtml;
    vm.getImage = getImage;
    vm.startPodcast = startPodcast;

    vm.isOpen = false;
    vm.isPlaying = isPlaying;
    vm.handleClick = handleClick;
    vm.getPodcastButtonState = getPodcastButtonState;

    function getPodcastButtonState() {
      return uiState.getState(vm.states.podcastButton);
    }

    function isPlaying() {
      return uiState.getState(vm.states.podcastPlaying);
    }

    function handleClick() {
      if (!isPlaying()) {
        startFirstPodcast();
      } else {
        stopPodcast();
      }
    }

    function startFirstPodcast() {
        $rootScope.$broadcast('player-play', vm.feed.episodes[0]);
    }

    function stopPodcast() {
          $rootScope.$broadcast('player-stop');
    }

    vm.goNext = goNext;
    vm.goPrev = goPrev;

    // function goNext() {
    //     $rootScope.$broadcast('main-next', {});
    // }
    //
    // function goPrev() {
    //     $rootScope.$broadcast('main-prev', {});
    // }


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

        if (day === 0) {
            return '../images/DotP_Icon-01.png';
        } else if (day === 1) {
            return '../images/DotP_Icon-02.png';
        } else if (day === 2) {
            return '../images/DotP_Icon-03.png';
        } else if (day === 3) {
            return '../images/DotP_Icon-04.png';
        } else if (day === 4) {
            return '../images/DotP_Icon-05.png';
        } else if (day === 5) {
            return '../images/DotP_Icon-06.png';
        }
        else {
            return '../images/DotP_Icon-01.png';
        }
    }

    function stripHtml(htmlString) {
    //     var firstPass = htmlString.replace('<h2>Defense of the Patience - A Dota 2 Podcast</h2> ', '');
    //     var secondPass = firstPass.replace('<h2><strong>Defense of the Patience - A Dota 2Podcast</strong></h2> ', '');
    //     var thirdPass = secondPass.replace('<h2><strong>Defense of the Patience - A Dota 2 Podcast</strong></h2> ', '');
    //     var fourthPass = thirdPass.replace('<strong>', '');
    //     var fifthPass = fourthPass.replace('</strong>', '');
    //     return fifthPass;
    	return htmlString;
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
