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
    'ui.router'
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
.run(function ($rootScope) {

    //send page to Google Analytics on state change
    $rootScope.$on('$stateChangeSuccess', function (event) {
        //TODO do something here to track the page (Google Analytics);
        console.log(event);
    });

});
