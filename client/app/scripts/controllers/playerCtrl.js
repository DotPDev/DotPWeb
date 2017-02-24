'use strict';

/**
* @ngdoc function
* @name clientApp.controller:PlayerCtrl
* @description
* # PlayerCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('PlayerCtrl', function ($timeout, $scope, $sce, playerSvc) {
    var vm = this;
    vm.isOpen = false;
    vm.API = null;
    vm.config = {
        sources: [],
        //we'll see about how to use theme and plugins later, these aren't used for now.
        theme: "bower_components/videogular-themes-default/videogular.css",
        plugins: {
            poster: "http://www.videogular.com/assets/images/videogular.png"
        },
        title: ''
    };
    vm.onPlayerReady = onPlayerReady;
    vm.canPlay = canPlay;

    function canPlay() {
        playAudio();
    }

    function onPlayerReady(API) {
        vm.API = API;
    }

    function playAudio() {
        if (vm.config.sources !== []) {
            vm.API.play();
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

});
