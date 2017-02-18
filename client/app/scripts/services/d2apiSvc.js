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
.factory('d2ApiSvc', function ($http, $timeout) {
    function getUserHistory(id) {
        return $http.get('/api/d2api/users/' + id + "/matches").then(function(response) {
            //TODO show a message indicating that we're getting data again.
            if (response.message && response.message === 'service not loaded') {
                $timeout(function() {
                    getUserHistory();
                }, 3000);
            }
            return response.data;
        }).catch(function(error) {
            //TODO show UI error to user
            console.log(error);
        });
    }

    function getLeagueListings() {
        return $http.get('/api/d2api/leagues').then(function(response) {
            //TODO show a message indicating that we're getting data again.
            if (response.message && response.message === 'service not loaded') {
                $timeout(function() {
                    getLeagueListings();
                }, 3000);
            }
            return response.data;
        }).catch(function(error) {
            //TODO show UI error to user
            console.log(error);
        });
    }

    return {
        getUserHistory: getUserHistory,
        getLeagueListings: getLeagueListings
    };
});
