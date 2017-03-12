'use strict';

describe('Controller: SocialCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var SocialCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SocialCtrl = $controller('SocialCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SocialCtrl.awesomeThings.length).toBe(3);
  });
});
