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
.factory('feedManager', function ($http, $timeout, $q) {
    var feedData = {
        episodes: [],
        meta: {}
    };

    function resetFeed() {
      feedData = {
          episodes: [],
          meta: {}
      };
    }

    function parseFeed(page) {
        if (feedData.episodes.length === 0) {
          console.log("wtf");
          setTimeout(resetFeed,300000);
            return $http.get('/api/feed/').then(function(response) {
                //TODO show a message indicating that we're getting data again.
                if (response.message && response.message === 'service not loaded') {
                    $timeout(function() {
                        parseFeed();
                    }, 3000);
                }
								console.log('feed', response.data)
                feedData = response.data;
                return getSlice(feedData, ((page * 5) - 5), (page * 5));
            }).catch(function(error) {
                //TODO show UI error to user
                console.log(error);
            });
        } else {
            var deferred = $q.defer();
            // Mimicking $http.get's success
            deferred.resolve(getSlice(feedData, ((page * 6) - 6), (page * 6)));

            return deferred.promise;
        }

    }

    function getSlice(feedData, start, end) {
        return {
            episodes: feedData.episodes.slice(start,end),
            meta: feedData.meta
        }
    }

    return {
        parseFeed: parseFeed
    };
});
