'use strict';

/**
* @ngdoc service
* @name clientApp.playerSvc
* @description
* # playerSvc
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('playerSvc', function () {
    var soundData = {

    };

    function playAudio(url) {

    }

    return {
        playAudio: playAudio
    };
});
