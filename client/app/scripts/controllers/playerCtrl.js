'use strict';

/**
* @ngdoc function
* @name clientApp.controller:PlayerCtrl
* @description
* # PlayerCtrl
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('PlayerCtrl', function ($rootScope, $state, $timeout, $scope, $sce, utils) {
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
    vm.page = 1;
    vm.links = {
        next: "/",
        prev: "/"
    };

    function setPageLinks() {
        console.log('in here');
        if (vm.page === 1) {
            vm.links.next = "?page=" + (vm.page + 1);
            vm.links.prev = "";
        } else {
            vm.links.next = "?page=" + (vm.page + 1);
            vm.links.prev = "?page=" + (vm.page - 1);
        }
    }

    function goNext(e) {
        e.preventDefault();
        $rootScope.$broadcast('main-next', {});
        setTimeout(function() {
            vm.page += 1;
            setPageLinks();
        },1);
    }

    function goPrev(e) {
        e.preventDefault();
        $rootScope.$broadcast('main-prev', {});
        setTimeout(function() {
            if (vm.page > 1) {
                vm.page -= 1;
                setPageLinks();
            }
        },1);
    }

    function init() {
        vm.page = parseInt(utils.getParameterByName('page'));
        if (!vm.page) {
            vm.page = 1;
        }
        setPageLinks();
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
