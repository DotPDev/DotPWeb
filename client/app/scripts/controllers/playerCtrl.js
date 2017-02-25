'use strict';

/**
* @ngdoc function
* @name clientApp.controller:PlayerCtrl
* @description
* # PlayerCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('PlayerCtrl', function ($rootScope, $state, $timeout, $scope, $sce) {
    var vm = this;
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

    $scope.$on('$stateChangeSuccess', function (event) {
        if ($state.current.name !== 'root.dashboard') {
            vm.isDashboard = false;
        } else {
            vm.isDashboard = true;
        }
    });

    init();

});
