'use strict';

/**
* @ngdoc service
* @name clientApp.firebaseSvc
* @description
* # firebaseSvc
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('firebaseSvc', function ($window) {
    var instance,
        storageInstance,
        unsubscribe,
        currentUser = null;

    return {
        initialize: function () {

            // Not initialized so... initialize Firebase
            var config = {
                apiKey: "AIzaSyAvbGaPlMAtBnnnAzkJRbpBmmmIMee-PEI",
                authDomain: "defenseofthepatience-b2b5f.firebaseapp.com",
                databaseURL: "https://defenseofthepatience-b2b5f.firebaseio.com",
                storageBucket: "defenseofthepatience-b2b5f.appspot.com",
                messagingSenderId: "45457898855"
            };

            // initialize database and storage
            instance = $window.firebase.initializeApp(config);
            storageInstance = $window.firebase.storage();

            // listen for authentication event, dont start app until I
            // get either true or false
            unsubscribe = $window.firebase.auth().onAuthStateChanged(function (user) {
                currentUser = user;
            });
        },
    };
});
