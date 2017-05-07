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
    'angularMoment',
    '720kb.socialshare',
    'vsGoogleAutocomplete'
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
            browserTitle: 'Main',
            description: 'A DOTA 2 Podcast dedicated to providing quality, regular content for fellow players enjoying the games we too know and love.'
        },
        views: {
            'container@': {
                templateUrl: 'views/home.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.dotpeeps', {
        url: '/dotpeeps',
        data: {
            pageName: 'DotpeepsCtrl',
            browserTitle: 'Dotpeeps',
            description: 'A list of people who have supported, built and ensured the growth of Defense of the Patience.'
        },
        views: {
            'container@': {
                templateUrl: 'views/dotpeeps.html',
                controller: 'DotpeepsCtrl',
                controllerAs: 'vm'
            }
        }
    });
		$stateProvider.state('root.hosts', {
        url: '/hosts',
        data: {
            pageName: 'hosts',
            browserTitle: 'Hosts',
            description: 'Our intrepid Hosts of the podcast'
        },
        views: {
            'container@': {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.ladder', {
        url: '/ladder',
        data: {
            pageName: 'LadderCtrl',
            browserTitle: 'Ladder',
            description: 'Every week on Wednesday starting at 9:00pm Eastern Time(USA) there will be (up to) 9 games that count towards our ladder (3 concurrent lobbies with 3 games each). Lobby 3 will be reserved for high skill players(4k+) while lobbies 1 and 2 will be for under 4k players. Once you have played in a game each night you are required to defer your spot in the following games to other players unless no other players are waiting to play.'
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
    $stateProvider.state('root.store', {
        url: '/store',
        data: {
            pageName: 'StoreCtrl',
            browserTitle: 'Store'
        },
        views: {
            'container@': {
                templateUrl: 'views/store.html',
                controller: 'StoreCtrl',
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
            browserTitle: 'About',
            description: 'Defense of the Patience is a gaming podcast founded in July 2014. We began as humble, amateur Dota 2 podcast hosts, and have expanded to cover additional games with special bonus episodes while still featuring a solid lineup of shows devoted to Dota 2 featuring a wide array of talented Dota 2 players, amateurs and scene insiders alike.'
        },
        views: {
            'container@': {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.episodes', {
        url: '/episodes',
        resolve: {
        },
        data: {
            pageName: 'EpisodesCtrl',
            browserTitle: 'Episodes',
            description: 'Defense of the Patience is a gaming podcast founded in July 2014. We began as humble, amateur Dota 2 podcast hosts, and have expanded to cover additional games with special bonus episodes while still featuring a solid lineup of shows devoted to Dota 2 featuring a wide array of talented Dota 2 players, amateurs and scene insiders alike.'
        },
        views: {
            'container@': {
                templateUrl: 'views/episodes.html',
                controller: 'MainCtrl',
                controllerAs: 'vm'
            }
        }
    });
    $stateProvider.state('root.social', {
        url: '/social',
        resolve: {
        },
        data: {
            pageName: 'SocialCtrl',
            browserTitle: 'Social',
            description: 'Share the Dota2 website to the social aggregator of your choice.'
        },
        views: {
            'container@': {
                templateUrl: 'views/social.html',
                controller: 'SocialCtrl',
                controllerAs: 'vm'
            }
        }
    });
})
.run(function ($rootScope, firebaseSvc, $location, googleAnalytics, MetaService) {
    googleAnalytics.init();

    firebaseSvc.initialize();

    //send page to Google Analytics on state change
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        googleAnalytics.trackPage($location.path());
        $rootScope.metaservice = MetaService;
        $rootScope.metaservice.set(toState.data.browserTitle, toState.data.description, "Dota 2, Dota 2 Podcast, DotP, Defense of the Patience, Defense of the Ancients, Defense of the Ancients Podcast, Dotp.Proud, Proud, DotP.Roland, Roland, DotP.Ursinity, Ursinity, DotP.Cyphus, Cyphus");
    });
});
