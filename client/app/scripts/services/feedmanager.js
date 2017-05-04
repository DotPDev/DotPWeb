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
          setTimeout(resetFeed,300000);
            return $http.get('/api/feed/').then(function(response) {
                //TODO show a message indicating that we're getting data again.
                if (response.message && response.message === 'service not loaded') {
                    $timeout(function() {
                        parseFeed();
                    }, 3000);
                }
                feedData = response.data;
                return scrubData(feedData, ((page * 6) - 6), (page * 6));
            }).catch(function(error) {
                //TODO show UI error to user
                console.log(error);
            });
        } else {
            var deferred = $q.defer();
            // Mimicking $http.get's success
            deferred.resolve(scrubData(feedData, ((page * 6) - 6), (page * 6)));

            return deferred.promise;
        }

    }

	function scrubData(feedData) {
		return {
			episodes: feedData.episodes.map(function(episode){
				if ((episode.link).indexOf('mp3') === -1) {
						episode.link = episode.enclosures[0]['url'];
				}
					episode.summary = stripHtml(episode.summary);
				
					return episode;
			}),
			meta: feedData.meta
		}
	}

	function stripHtml(htmlString) {
		if (htmlString) {
			var firstPass = htmlString.replace('<h2>Defense of the Patience - A Dota 2 Podcast</h2> ', '');
      var secondPass = firstPass.replace('<h2><strong>Defense of the Patience - A Dota 2Podcast</strong></h2> ', '');
      var thirdPass = secondPass.replace('<h2><strong>Defense of the Patience - A Dota 2 Podcast</strong></h2> ', '');
      var fourthPass = thirdPass.replace('<strong>', '');
      var fifthPass = fourthPass.replace('</strong>', '');

    	return fifthPass.replace( /<{1}[^<>]{1,}>{1}/g,"")
		}
    return; 
  }

    // function getSlice(feedData, start, end) {
    //   return {
    //     episodes: feedData.episodes,
    //     meta: feedData.meta
    //   }
			// // return {
    //     // episodes: feedData.episodes.slice(start,end),
    //     // meta: feedData.meta
    //   // }
    // }

    return {
        parseFeed: parseFeed
    };
});
