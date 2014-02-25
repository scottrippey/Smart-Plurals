describe('AngularJS', function() {
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

    it('creates the plural filter',
      inject(function(pluralFilter) {
        expect(typeof pluralFilter).toBe('function');
      })
    );

    it('filters a number',
      inject(function($compile, $rootScope) {
        var fixture = angular.element("<div> There {{ value | plural:'is':'are' }} {{ value }} {{ value | plural:'item':'items' }}. </div>");

        // Bootstrap:
        $compile(fixture)($rootScope);

        $rootScope.$apply(function() {
          $rootScope.value = 1;
        });
        expect(fixture.html()).toBe(" There is 1 item. ");

        $rootScope.$apply(function() {
          $rootScope.value = 2;
        });
        expect(fixture.html()).toBe(" There are 2 items. ");

      })
    );
  });
});
