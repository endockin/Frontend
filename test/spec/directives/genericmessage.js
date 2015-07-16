'use strict';

describe('Directive: genericMessage', function () {

  // load the directive's module
  beforeEach(module('VMFactoryApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<generic-message></generic-message>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the genericMessage directive');
  }));
});
