describe('Smart.Plurals.angular', function() {
  describe('SmartPlurals service', function() {
    beforeEach(module('smart'));

    it('creates the SmartPlurals service',
      inject(function(SmartPlurals) {
        expect(typeof SmartPlurals).toBe('object');
        expect(typeof SmartPlurals.getRule).toBe('function');
      })
    );

  });
  describe('plural filter', function() {
    beforeEach(module('smart'));

    it('creates the plural filter', inject(function(pluralFilter) {
      expect(typeof pluralFilter).toBe('function');
    }));

    it('applies logic for singular, plural', inject(function($compile, $rootScope) {
      var element = angular.element("<div> There {{ value | plural:'is':'are' }} {{ value }} {{ value | plural:'item':'items' }}. </div>");
      $compile(element)($rootScope);

      $rootScope.$apply(function() {
        $rootScope.value = 1;
      });
      expect(element.html()).toBe(" There is 1 item. ");

      $rootScope.$apply(function() {
        $rootScope.value = 2;
      });
      expect(element.html()).toBe(" There are 2 items. ");

    }));

    it('applies logic for zero, singular, plural', inject(function($compile, $rootScope) {
      var element = angular.element("<div> There {{ value | plural:'are no items':'is an item':'are '+value+' items' }}. </div>");
      $compile(element)($rootScope);

      $rootScope.$apply(function() {
        $rootScope.value = 0;
      });
      expect(element.html()).toBe(" There are no items. ");

      $rootScope.$apply(function() {
        $rootScope.value = 1;
      });
      expect(element.html()).toBe(" There is an item. ");

      $rootScope.$apply(function() {
        $rootScope.value = 2;
      });
      expect(element.html()).toBe(" There are 2 items. ");

    }));

    it('applies logic for negative, zero, singular, plural', inject(function($compile, $rootScope) {
      var element = angular.element("<div> There {{ value | plural:'are missing items':'are no items':'is an item':'are '+value+' items' }}. </div>");
      $compile(element)($rootScope);

      $rootScope.$apply(function() {
        $rootScope.value = -2;
      });
      expect(element.html()).toBe(" There are missing items. ");

      $rootScope.$apply(function() {
        $rootScope.value = 0;
      });
      expect(element.html()).toBe(" There are no items. ");

      $rootScope.$apply(function() {
        $rootScope.value = 1;
      });
      expect(element.html()).toBe(" There is an item. ");

      $rootScope.$apply(function() {
        $rootScope.value = 2;
      });
      expect(element.html()).toBe(" There are 2 items. ");

    }));
  });
});
