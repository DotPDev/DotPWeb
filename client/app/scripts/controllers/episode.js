'use strict';

	/**
	 * @ngdoc function
	 * @name clientApp.controller:MainCtrl
	 * @description
	 * # MainCtrl
	 * Controller of the clientApp
	 */
angular.module('clientApp')
	.controller('EpisodeCtrl', function ($scope, $stateParams, $http, $rootScope, feedManager, utils) {
    var vm = this;
	
    vm.getImage = getImage;
    vm.startPodcast = startPodcast;

    vm.isOpen = false;
    vm.handleClick = handleClick;

    function handleClick() {
      vm.isOpen = !vm.isOpen;
      console.log(vm.isOpen);
    }


    function init() {
      getEpisode();
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

    function getEpisode() {
      feedManager.parseFeed(vm.page).then(function(response) {
        vm.episode = response.episodes.find((e) => e.guid === $stateParams.episodeId);
		console.log(vm.episode)	
      }).catch(function(error) {
        console.log(error);
      });
    }

    function startPodcast(episode) {
      $rootScope.$broadcast('player-play', episode);
    }

    init();
	});
