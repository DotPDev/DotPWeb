'use strict';

/**
* @ngdoc service
* @name clientApp.cartSvc
* @description
* # utils
* Factory in the clientApp.
*/
angular.module('clientApp')
.factory('DotpLoaderSvc', function ($window) {

var loadingContainer = document.getElementById("dotp-loader-container");

function loadPage() {
  loadingContainer.className += " loading";
}

function resetLoader() {
  loadingContainer.className = "ng-scope reset";
}

function startLoader() {
  loadingContainer.className = "ng-scope";
  setTimeout(loadPage, 1000);
  setTimeout(resetLoader, 2000);
}

  return {
    startLoader: startLoader
  };
});
