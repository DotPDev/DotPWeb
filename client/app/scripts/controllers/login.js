'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($state, auth, $window, utils) {
    var vm = this;
    vm.user = auth.getAuth();
    vm.submitForm = submitForm;
    vm.createUser = createUser;
    vm.updateProfile = updateProfile;
    vm.resetPassword = resetPassword;
    vm.cancelAction = cancelAction;
    vm.login = login;
    vm.forgotPassword = forgotPassword;
    vm.password = '';
    vm.userEmail = '';
    vm.newUserEmail = '';
    vm.newUserDisplayName = '';
    vm.resetEmail = '';
    vm.newPassword = '';
    vm.confirmPassword = '';
    vm.createMode = false;
    vm.resetPasswordMode = false;

    function submitForm(isValid) {
        if (isValid) {
            if (vm.createMode) {
                createUser();
            } else {
                login();
            }
        }
    }

    function resetPassword() {
        vm.createMode = false;
        vm.resetPasswordMode = true;
    }

    function cancelAction() {
        vm.createMode = false;
        vm.resetPasswordMode = false;
    }

    function forgotPassword(email) {
        auth.resetPassword(email).then(function(response) {
            //TODO show email sent UI
        }).catch(function(error) {
            //TODO show error in UI to user
            console.log(error);
            console.log('reset email error, object is:');
        });
    }

    function login() {
        auth.signIn(vm.userEmail, vm.password).then(function(response) {
            vm.user = response;
            $state.go('root.dashboard');
        }).catch(function(error) {
            //TODO catch error
            console.log(error);
        });
    }

    function createUser() {
        auth.createUserAccount(vm.newUserEmail, vm.newPassword).then(function(response) {
            //TODO then update and add user to users collection
            updateProfile(response, true);
        }).catch(function(error) {
            //TODO catch error
            console.log(error);
        });
    }

    function updateProfile(user, isNewAccount) {
        user.updateProfile({
            email: user.email,
            displayName: vm.newUserDisplayName || ''
        }).then(function() {
            //The UI is observing the state changes to firebase.Auth() so we are calling login() again here to register changes after doing updateProfile()
            //No need to call a third time after updateCustomProfile() because the bound UI elements displaying the logged in user only are concerned with the account and not our custom profile.
            login();
            updateCustomProfile(user, isNewAccount);
        }, function(error) {
            //TODO handle ui error to user
            console.log(error);
        });
    }

    function updateCustomProfile(user, isNewAccount) {
        var createdTime = utils.makeServerTime();
        var userUpdateSet = {
            email: user.email,
            displayName: vm.newUserDisplayName || '',
            photoURL: user.photoURL || '',
            createdAt: createdTime
        };
        if (isNewAccount) {
            $window.firebase.database().ref('users/' + user.uid).set(userUpdateSet).then(function() {
                //TODO successful UI message
            }).catch(function(error) {
                //TODO fail UI message
                console.log(error);
            });
        } else {
            $window.firebase.database().ref('users/' + user.uid).update(userUpdateSet).then(function() {
                //TODO successful UI message
            }).catch(function(error) {
                //TODO fail UI message
                console.log(error);
            });
        }
    }


});
