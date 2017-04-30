'use strict';

/**
* @ngdoc service
* @name clientApp.UiStateSvc
* @description
* # metaService
* Service in the clientApp.
*/
angular.module('clientApp')
.factory('uiState', function () {
  var vm = this;
  vm.isPodcastOpen = false;
  vm.isPodcastPlaying = false;
  vm.timeStamp = new Date();

  function getState(state) {
    //console.log("state = " + state);
    //console.log(vm[state]);
    if (vm && vm[state]) {
      return vm[state];
    }
    return false;
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
