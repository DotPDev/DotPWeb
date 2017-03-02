'use strict';

/**
* @ngdoc filter
* @name clientApp.filter:playerDate
* @function
* @description
* # playerDate
* Filter in the clientApp.
*/
angular.module('clientApp')
.filter('playerDate', function ($filter, moment) {
    var angularDateFilter = $filter('date');
    return function(theDate) {
        var now = new Date(theDate);
        var oneHour = 60 * 60 * 1000;
        if (now - oneHour < 0) {
            return angularDateFilter(theDate, 'mm:ss');
        } else {
            return moment(theDate).utc().format('hh:mm:ss');
        }
    };
});
