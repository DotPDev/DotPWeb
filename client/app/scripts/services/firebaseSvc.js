'use strict';

/**
* @ngdoc service
* @name clientApp.firebaseSvc
* @description
* # firebaseSvc
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('firebaseSvc', function ($window, $q) {
    var instance,
        databaseInstance,
        storageInstance,
        unsubscribe,
        currentUser = null;

    function getDatabaseOnce(path) {
        var defer = $q.defer();
        databaseInstance.ref(path).once('value').then(function (snapshot) {
            defer.resolve(snapshot.val());
        });
        return defer.promise;
    }


    function initialize() {
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
        databaseInstance = $window.firebase.database();
        // listen for authentication event, dont start app until I
        // get either true or false
        unsubscribe = $window.firebase.auth().onAuthStateChanged(function (user) {
            currentUser = user;
        });

    }

    return {
        initialize: initialize,
        getDatabaseOnce: getDatabaseOnce 
    };
});
