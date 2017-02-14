'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LoginCtrl', function ($state, auth, $window) {
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

    function forgotPassword() {
        auth.resetPassword('test@email.com').then(function(response) {
            //TODO will always be void
        });
    }

    function login() {
        auth.signIn(vm.userEmail, vm.password).then(function(response) {
            vm.user = response;
            $state.go('root.dashboard');
        }).catch(function(error) {
            //TODO catch error
        });
    }

    function createUser() {
        auth.createUserAccount(vm.newUserEmail, vm.newPassword).then(function(response) {
            //TODO then update and add user to users collection
        }).catch(function(error) {
            //TODO catch error
        });
    }

    function updateProfile(commanderName, isNew) {
        var user = $window.firebase.auth().currentUser;
        user.updateProfile({
            displayName: commanderName
        }).then(function() {
            if (isNew) {
                $state.go('root.dashboard');
            }
        }, function(error) {
        });
    }


});
