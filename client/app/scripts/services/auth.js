'use strict';

/**
* @ngdoc service
* @name clientApp.auth
* @description
* # auth
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('auth', function ($window) {
    var firebase = $window.firebase;

    function createUserAccount(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            //TODO handle error
            return null;
        });
    }

    function signIn(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            //TODO handle error
            return null;
        });
    }

    function signOut() {
        return firebase.auth().signOut();
    }

    function getAuth() {
        return firebase.auth().currentUser;
    }

    function resetPassword(email) {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    return {
        createUserAccount: createUserAccount,
        signIn: signIn,
        signOut: signOut,
        getAuth: getAuth,
        resetPassword: resetPassword
    };
});
