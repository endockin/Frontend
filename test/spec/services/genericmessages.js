'use strict';

describe('Service: genericMessages', function () {

  // load the service's module
  beforeEach(module('VMFactoryApp'));

  // instantiate service
  var genericMessages;
  beforeEach(inject(function (_genericMessages_) {
    genericMessages = _genericMessages_;
  }));

  it('should do something', function () {
    expect(!!genericMessages).toBe(true);
  });

});
