'use strict';

/**
* @ngdoc service
* @name clientApp.UiStateSvc
* @description
* # metaService
* Service in the clientApp.
*/
angular.module('clientApp')
.service('uiState', function () {
  var vm = this;
  vm.isPodcastOpen = false;
  vm.timeStamp = new Date();

  function getState(state) {
    console.log(state);
    console.log(vm[state]);
    console.log(vm.timeStamp);
    if (vm && vm[state]) {
      return vm[state];
    }
    return null;
  }

  function setState(state, value) {
    vm[state] = value;
  }

  function toggleState(state) {
    vm[state] = !vm[state];
  }

    return {
        getState: getState,
        setState: setState,
        toggleState: toggleState
    };
});
