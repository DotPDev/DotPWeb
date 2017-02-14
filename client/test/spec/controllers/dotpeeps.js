'use strict';

describe('Controller: DotpeepsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var DotpeepsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DotpeepsCtrl = $controller('DotpeepsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DotpeepsCtrl.awesomeThings.length).toBe(3);
  });
});
