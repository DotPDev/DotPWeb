'use strict';

	/**
 	 * @ngdoc directive
 	 * @name clientApp.directive:player
 	 * @description
 	 * # player
 	 */
angular.module('clientApp')
 	.controller('SocialLinksCtrl', function() {
   	var vm = this;
   	vm.getClass = getClass;

   	function getClass(type) {
     	var lowerType = type.toLowerCase();
     	if (lowerType === "twitch") {
       	return "fa fa-twitch";
     	} else if (lowerType === "twitter") {
       	return "fa fa-twitter";
     	} else if (lowerType === "youtube") {
       	return "fa fa-youtube";
     	} else if (lowerType === "patreon") {
       	return "patreon-icon";
     	} else if (lowerType === "discord") {
       	return "discord-icon";
     	}
   	}

 	})
 	.directive('socialLinks', function () {
    return {
      scope: {
        links: "=links"
      },
      templateUrl: 'views/socialLinks.html',
      controller: 'SocialLinksCtrl',
      controllerAs: 'vm',
      restrict: 'EA',
      bindToController: true
    };
 	});
