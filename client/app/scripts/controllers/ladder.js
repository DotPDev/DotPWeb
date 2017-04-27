'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LadderCtrl
 * @description
 * # LadderCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('LadderCtrl', function (firebaseSvc) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var vm = this;
    vm.ladder = {
    	players: []
    };

    firebaseSvc.getDatabaseOnce("inhouse-ladder").then(function(res) {
    	console.log(res);
    	vm.ladder.players = res.sort(sortByPoints);
    });

    function sortByPoints(a, b) {
    	var aPoints = parseInt(a.points);
    	var bPoints = parseInt(b.points);
    	if (aPoints > bPoints) {
    		return -1;
    	} else {
    		return 1;
    	}
    }

    Ps.initialize($("#ladder-wrapper")[0]);

  });
