'use strict';

/**
* @ngdoc service
* @name clientApp.utils
* @description
* # utils
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('utils', function ($window) {
    function makeServerTime() {
        var dateTime = Date.now();
        var timestamp = Math.floor(dateTime / 1000);
        return timestamp;
    }

	function getParameterByName(name, url) {
	    if (!url) {
	      url = $window.location.href;
	    }
	    name = name.replace(/[\[\]]/g, "\\$&");
	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	        results = regex.exec(url);
	    if (!results) {
	    	return null;
	    }
	    if (!results[2]) {
	    	return '';
	    }
	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

    return {
    	getParameterByName: getParameterByName,
        makeServerTime: makeServerTime
    };
});
