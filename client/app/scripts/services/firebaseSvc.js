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
        currentUser = null,
        ladderData = null;

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

        // listen for authentication event, dont start app until I
        // get either true or false
        unsubscribe = $window.firebase.auth().onAuthStateChanged(function (user) {
            currentUser = user;
        });


        console.log(getLadderData());
    }

    function getLadderData () {
        if (!ladderData) {
            instance.database().ref('/inhouse-ladder').once('value').then(function(snapshot) {
                ladderData = snapshot.val();
            });
        }
        // var ladder = new $window.firebase('https://defenseofthepatience-b2b5f.firebaseio.com/movies');

        // ladder.on("value", function(snapshot) {
        //     var data = snapshot.val();
        //     console.log(data);
        //     var list = [];
        //     // for (var key in data) {
        //     //     if (data.hasOwnProperty(key)) {
        //     //         var name = data[key].name ? data[key].name : '';
        //     //         if (name.trim().length > 0) {
        //     //             list.push({
        //     //                 name: name,
        //     //                 key: key
        //     //             });
        //     //         }
        //     //     }
        //     // }
        //     // refresh the UI
        //     console.log(list);
        // });
    }


    return {
        initialize: initialize,


    };
});
