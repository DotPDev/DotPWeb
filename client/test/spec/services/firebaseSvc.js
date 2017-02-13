'use strict';

describe('Service: firebaseSvc', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var firebaseSvc;
  beforeEach(inject(function (_firebaseSvc_) {
    firebaseSvc = _firebaseSvc_;
  }));

  it('should do something', function () {
    expect(!!firebaseSvc).toBe(true);
  });

});
