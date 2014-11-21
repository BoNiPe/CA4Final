'use strict';

describe('Jasmin owns viewHome <3', function() {

  beforeEach(module('myAppRename.viewHome'));

  describe('viewHome controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});