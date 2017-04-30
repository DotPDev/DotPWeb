'use strict';

/**
* @ngdoc function
* @name clientApp.controller:PlayerCtrl
* @description
* # PlayerCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('PlayerCtrl', function ($rootScope, $state, $timeout, $scope, $sce, feedManager, uiState) {
    var vm = this;
    vm.feed = {};
    vm.feed.episodes = [];
    vm.startPodcast = startPodcast;
    vm.isOpen = false;
    vm.isPlaying = false;
    vm.isDashboard = false;
    vm.API = null;
    vm.onPlayerReady = onPlayerReady;
    vm.canPlay = canPlay;
    vm.onComplete = onComplete;
    vm.config = {
        sources: [],
        //we'll see about how to use theme and plugins later, these aren't used for now.
        theme: "bower_components/videogular-themes-default/videogular.css",
        plugins: {
            poster: "http://www.videogular.com/assets/images/videogular.png"
        },
        title: ''
    };
    vm.goNext = goNext;
    vm.goPrev = goPrev;
    vm.page = 1;

    function getFeed() {
        feedManager.parseFeed(vm.page).then(function(response) {
            vm.feed = response;
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }
    getFeed();

    function startPodcast() {
        $rootScope.$broadcast('player-play', vm.feed.episodes[0]);
    }

    function goNext() {
        $rootScope.$broadcast('main-next', {});
    }

    function goPrev() {
        $rootScope.$broadcast('main-prev', {});
    }

    function init() {
        if ($state.current.name === 'root.dashboard') {
            vm.isDashboard = true;
        }
    }

    function onComplete() {
        vm.isPlaying = false;
    }

    function canPlay() {
        playAudio();
    }

    function onPlayerReady(API) {
        vm.API = API;
    }

    function playAudio() {
        if (vm.config.sources !== []) {
            vm.API.play();
            vm.isPlaying = true;
        }
    }

    $scope.$on('player-play', function(event, args) {
        if (args) {
            uiState.setState("isPodcastPlaying", true);
            vm.API.stop();
            vm.config.sources = [
                {
                    src: $sce.trustAsResourceUrl(args.link),
                    type: "audio/mp3"
                }
            ];
            vm.config.title = args.title;
        }
    });

    $scope.$on('player-stop', function(event) {
          uiState.setState("isPodcastPlaying", false);
            vm.API.pause();
            vm.isPlaying = false;
            vm.config.sources = [];
    });

    $scope.$on('$stateChangeSuccess', function (event) {
        if ($state.current.name !== 'root.dashboard') {
            vm.isDashboard = false;
        } else {
            vm.isDashboard = true;
        }
    });

    init();

}).filter('millSecondsToTimeString', function() {
  return function(millseconds) {
      var oneSecond = 1000;
      var oneMinute = oneSecond * 60;
      var oneHour = oneMinute * 60;
      var oneDay = oneHour * 24;

      var seconds = Math.floor((millseconds % oneMinute) / oneSecond);
      var minutes = Math.floor((millseconds % oneHour) / oneMinute);
      var hours = Math.floor((millseconds % oneDay) / oneHour);
      if (seconds.toString().length === 1) {
        seconds = "0" + seconds;
      }
      if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
      }


      return hours + ":" + minutes + ":" + seconds;
  };
});
