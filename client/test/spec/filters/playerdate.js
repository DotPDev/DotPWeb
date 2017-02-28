'use strict';

describe('Filter: playerDate', function () {

  // load the filter's module
  beforeEach(module('clientApp'));

  // initialize a new instance of the filter before each test
  var playerDate;
  beforeEach(inject(function ($filter) {
    playerDate = $filter('playerDate');
  }));

  it('should return the input prefixed with "playerDate filter:"', function () {
    var text = 'angularjs';
    expect(playerDate(text)).toBe('playerDate filter: ' + text);
  });

});
