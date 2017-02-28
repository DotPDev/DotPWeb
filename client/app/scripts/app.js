'use strict';

/**
* @ngdoc overview
* @name clientApp
* @description
* # clientApp
*
* Main module of the application.
*/
angular
.module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ui.router',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.poster',
    'matchMedia',
    'angularMoment'
])
.config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('root', {
        url: '',
        // Make this state abstract so it can never be
        // loaded directly
        abstract: true,
        resolve: {
        },
        views: {
            'titlebar@': {
                templateUrl: 'views/titlebar.html',
                controller: 'TitlebarCtrl',
                controllerAs: 'vm'
            },
        }
    });
    $stateProvider.state('root.dashboard', {
        url: '/',
        resolve: {
        },
        data: {
            pageName: 'MainCtrl',
            browserTitle: 'Main'
        },
        views: {
            'container@': {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.dotpeeps', {
        url: '/dotpeeps',
        data: {
            pageName: 'DotpeepsCtrl',
            browserTitle: 'Dotpeeps'
        },
        views: {
            'container@': {
                templateUrl: 'views/dotpeeps.html',
                controller: 'DotpeepsCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.ladder', {
        url: '/ladder',
        data: {
            pageName: 'LadderCtrl',
            browserTitle: 'Ladder'
        },
        views: {
            'container@': {
                templateUrl: 'views/ladder.html',
                controller: 'LadderCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.media', {
        url: '/media',
        data: {
            pageName: 'MediaCtrl',
            browserTitle: 'Media'
        },
        views: {
            'container@': {
                templateUrl: 'views/media.html',
                controller: 'MediaCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.login', {
        url: '/login',
        resolve: {
        },
        data: {
            pageName: 'LoginCtrl',
            browserTitle: 'Login'
        },
        views: {
            'container@': {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.about', {
        url: '/about',
        resolve: {
        },
        data: {
            pageName: 'AboutCtrl',
            browserTitle: 'About'
        },
        views: {
            'container@': {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            }
        }
    });
})
.run(function ($rootScope, firebaseSvc, $location, googleAnalytics) {
    googleAnalytics.init();

    firebaseSvc.initialize();

    //send page to Google Analytics on state change
    $rootScope.$on('$stateChangeSuccess', function (event) {
        googleAnalytics.trackPage($location.path());
    });

});
