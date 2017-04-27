'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    console.log($scope.links);
    vm.selectedSection = 'dotp';
    $scope.dotpSocialLinks = [{
      type: "discord",
      url: "https://discord.gg/dotp"
    },{
      type: "twitch",
      url: "https://twitch.tv/dotptv"
    },{
      type: "youtube",
      url: "https://www.youtube.com/dotptv1"
    },{
      type: "patreon",
      url: "https://www.patreon.com/DefenseOfThePatience"
    },{
      type: "twitter",
      url: "https://twitter.com/DotP_Show"
    }
    ];

    $scope.rolandSocialLinks = [{
      type: "twitter",
      url: "https://twitter.com/DotP_Roland"
    }
    ];

    $scope.cyphusSocialLinks = [{
      type: "twitter",
      url: "https://twitter.com/DotP_Cyphus"
    }
    ];

    $scope.ursiSocialLinks = [{
      type: "twitter",
      url: "https://twitter.com/Ursinity"
    }
    ];

    $scope.proudSocialLinks = [{
      type: "twitter",
      url: "https://twitter.com/ProudDota"
    }
    ];

    $scope.breakySocialLinks = [{
      type: "twitter",
      url: "https://twitter.com/breakycpk"
    }
    ];

    function navigateAbout(str) {
      console.log(str);
      vm.selectedSection = str;
    }

    function getActiveState(str) {
      if (str == vm.selectedSection) {
        return 'active';
      }
    }

    function handleScrollBars() {
      [].forEach.call(document.querySelectorAll('.about-page'), function (el) {
        Ps.initialize(el);
      });
    }

    handleScrollBars();

    return {
      getActiveState: getActiveState,
      navigateAbout: navigateAbout
    };
  });
