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
    $locationProvider.html5Mode(true); // <-- ADD THIS

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
});
