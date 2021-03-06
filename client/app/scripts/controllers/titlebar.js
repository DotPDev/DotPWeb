'use strict';
var dotptvUrl = 'https://api.twitch.tv/kraken/streams/dotptv?client_id=';
var twitchToken = '3z0mitbqrdjd3d7qrj1rirl6wrzp13';

	/**
	 * @ngdoc function
	 * @name clientApp.controller:TitlebarCtrl
	 * @description
	 * # TitlebarCtrl
	 * Controller of the clientApp
	 */
angular.module('clientApp')
	.controller('TitlebarCtrl', function ($scope, auth, $window, $state, screenSize) {
    var vm = this;
    vm.user = auth.getAuth();
    vm.signOut = signOut;
    vm.isShowingLogin = false;
		vm.getTwitchClass = getTwitchClass;
    vm.goToLogin = goToLogin;
    vm.isCollapsed = false;
    vm.slideNavPanel = false;
    vm.clickPower = clickPower;
		vm.isStreaming = false;

		$scope.dotpSocialLinks = [
			{
      	type: "discord",
      	url: "https://discord.gg/dotp"
    	},
			{
      	type: "twitch",
      	url: "https://twitch.tv/dotptv"
    	},
			{
      	type: "youtube",
      	url: "https://www.youtube.com/dotptv1"
			},
			{
     	 	type: "patreon",
     	 	url: "https://www.patreon.com/DefenseOfThePatience"
    	},
			{
      	type: "twitter",
     		url: "https://twitter.com/DotP_Show"
    	},
			{
				type: "PVGNA",
				url: "https://pvgna.com/?ref=dotp"
			}
    ];

  	screenSize.rules = {
      smartphones: 'only screen and (max-width: 830px)'
    };

    function init() {
      trackViewSize();
    }

    function clickPower() {
      if (screenSize.is('smartphones')) {
        //add class that shows the nav in mobile
        vm.slideNavPanel = !vm.slideNavPanel;
      } else {
        vm.isShowingLogin = !vm.isShowingLogin;
      }
    }

    function trackViewSize() {
      if (screenSize.is('smartphones')) {
        vm.isCollapsed = true;
      }
      screenSize.on('smartphones', function(isMatch){
        vm.isCollapsed = isMatch;
      });
    }

    function goToLogin() {
      vm.isShowingLogin = false;
      $state.go('root.login');
    }

    function signOut() {
      vm.isShowingLogin = false;
      auth.signOut();
      $state.go('root.dashboard');
    }

		function getTwitchClass() {
			getTwitchStatus()
			
			return vm.isStreaming ? 'streaming' : 'offline';
		}

		function getErrors(res) {
			return res.json()
				.then(function(resultJson) { return resultJson.error });
		}

		function getHeaders() {
			var headers = new Headers();
			headers.append('Accept', 'application/json'),
				headers.append('Content-Type', 'application/json');

			return headers;
		}

		function getJson(res) {
			return res.json()
				.then(function(resultJson) { return resultJson});
		}
		
		function getRequest(url) {
			const req = {
				method: 'GET',
				headers: getHeaders(),
				credentials: 'same-origin',
			};

			return new Request(
				url,
				req
			);
		}

		function getTwitchStatus() {
			fetch(getRequest(dotptvUrl + twitchToken))
				.then(function(res) {
					if (!res.ok) {
						getErrors(res).then(function(err) { console.log(err) });
					} else {
						getJson(res).then(function(data) {
							vm.isStreaming = data.stream !== null;
						});
					}
				})
		}

    $window.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.user = user;
        $scope.$apply();
      } else {
        vm.user = null;
        $scope.$apply();
      }
    });

    init();
	});
