'use strict';

/**
* @ngdoc filter
* @name clientApp.filter:playerDate
* @function
* @description
* # playerDate
* Filter in the clientApp.
*/
angular.module('clientApp')
.filter('episodeFilter', function () {
    return function(episode, searchTxt, arg3) {
        console.log(episode, searchTxt, arg3)
				// if () {
        // } else {
        // }
			return false;
    };
});
