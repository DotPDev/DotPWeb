'use strict';

/**
* @ngdoc service
* @name clientApp.utils
* @description
* # utils
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('utils', function () {
    function makeServerTime() {
        var dateTime = Date.now();
        var timestamp = Math.floor(dateTime / 1000);
        return timestamp;
    }

    return {
        makeServerTime: makeServerTime
    };
});
