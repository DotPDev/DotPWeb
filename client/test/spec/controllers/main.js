'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var MainCtrl,
    scope,
    feedManager,
    $q;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _feedManager_, _$q_) {
    scope = $rootScope.$new();
    feedManager = _feedManager_;
    $q = _$q_;
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      feedManager: _feedManager_
    });
  }));

  describe('init', function () {
      it('should make sure to call getFeeds', function () {
        expect(MainCtrl.feed.length).not.toBe({});
      });
  });

});
