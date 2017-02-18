'use strict';

describe('Controller: LadderCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var LadderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LadderCtrl = $controller('LadderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LadderCtrl.awesomeThings.length).toBe(3);
  });
});
