'use strict';

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
		vm.twitchStatus = twitchStatus;
    vm.isShowingLogin = false;
    vm.goToLogin = goToLogin;
    vm.isCollapsed = false;
    vm.slideNavPanel = false;
    vm.clickPower = clickPower;
    screenSize.rules = {
      smartphones: 'only screen and (max-width: 830px)'
    };

		function twitchStatus() {
			fetch(getRequest('https://api.twitch.tv/kraken/streams/dotptv?client_id=3z0mitbqrdjd3d7qrj1rirl6wrzp13'))
				.then((res) => {
					if (!res.ok) {
						getErrors(res).then((err) => console.log(err));
					} else {
						getJson(res).then((data) => console.log(data));
					}
				})
		}

		const getErrors = (response) => {
			return response.json()
				.then((resultJson) => resultJson.error);
		};

		const getJson = (res) => {
			return response.json()
				.then((resultJson) => resultJson);
		};
		const getRequest = (url) => {
			const req = {
				method: 'GET',
				headers: getHeaders(),
				credentials: 'same-origin',
			};

			if (credentials) req.body = JSON.stringify(Object.assign({}, credentials));

			return new Request(
				url,
				req
			);
		};

		const getHeaders = () => {
			let headers = new Headers();
			headers.append('Accept', 'application/json'),
				headers.append('Content-Type', 'application/json');

			return headers;
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
