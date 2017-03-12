'use strict';

describe('Service: MetaService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var MetaService;
  beforeEach(inject(function (_MetaService_) {
    MetaService = _MetaService_;
  }));

  it('should do something', function () {
    expect(!!MetaService).toBe(true);
  });

});
