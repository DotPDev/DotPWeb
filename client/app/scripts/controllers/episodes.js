'use strict';

	/**
	 * @ngdoc function
	 * @name clientApp.controller:MainCtrl
	 * @description
	 * # MainCtrl
	 * Controller of the clientApp
	 */
angular.module('clientApp')
	.controller('EpisodesCtrl', function ($scope, $http, $rootScope, feedManager, utils) {
    var vm = this;
    vm.feed = {};
    vm.page = 1;
    vm.links = {
      next: "/",
      prev: "/"
    };
    vm.getImage = getImage;
    vm.startPodcast = startPodcast;

    vm.isOpen = false;
    vm.handleClick = handleClick;

    function handleClick() {
      vm.isOpen = !vm.isOpen;
      console.log(vm.isOpen);
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
      console.log(date);
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

    function setPageLinks() {
      console.log('in here');
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
