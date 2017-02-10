'use strict';

/**
* @ngdoc service
* @name clientApp.feedManager
* @description
* # feedManager
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('feedManager', function ($http, $sce) {

    function parseFeed() {
        var url = $sce.trustAsResourceUrl('http://defenseofthepatience.libsyn.com/rss');
        var jsonConverterUrl =  'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(url);
        return $http.get(jsonConverterUrl).then(function(response) {
            return response.data;
        }).catch(function(error) {
            console.log(error);
        });
    }

    return {
        parseFeed: parseFeed
    };
});
