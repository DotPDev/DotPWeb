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
    		// vm.ladder.players = res.sort(sortByPoints);
    		console.log(res)
    		vm.ladder.players = res.map(parsePlayer).sort(sortByPoints)
			console.log(vm.ladder.players)
    	});

	  	function parsePlayer(p) {
			var link = "http://www.dotabuff.com/players/";
			var addedFields = {};
			if (p.playerId) addedFields.link = link + p.playerId;
			if (p.nameColor) addedFields.nameStyle = "color:#" + p.nameColor;

			addedFields.points = 1000 + (p.wins * 50) - (p.losses * 50);
			
			return Object.assign({}, p, addedFields);
	  	}


		function sortByPoints(a, b) {
    		var aPoints = parseInt(a.points);
    		var bPoints = parseInt(b.points);
    		if (aPoints > bPoints) {
    			return -1;
    		} else {
    			return 1;
    		}
    	}

  	});
