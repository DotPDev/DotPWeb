/* jshint ignore:start */

'use strict';

/**
* @ngdoc service
* @name clientApp.feedManager
* @description
* # feedManager
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('feedManager', function ($http, $timeout) {
    function parseFeed() {
        return $http.get('/api/feed/').then(function(response) {
            //TODO show a message indicating that we're getting data again.
            if (response.message && response.message === 'service not loaded') {
                $timeout(function() {
                    parseFeed();
                }, 3000);
            }
            return response.data;
        }).catch(function(error) {
            //TODO show UI error to user
            console.log(error);
        });
    }

    return {
        parseFeed: parseFeed
    };
});
