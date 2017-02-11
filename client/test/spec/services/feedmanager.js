'use strict';

describe('Service: feedManager', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var feedManager;
  beforeEach(inject(function (_feedManager_) {
    feedManager = _feedManager_;
  }));

  it('should do something', function () {
    expect(!!feedManager).toBe(true);
  });

});
