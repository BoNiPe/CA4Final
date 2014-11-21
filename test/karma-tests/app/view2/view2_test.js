describe('Jasmin owns view2 <3', function() {

        describe('view2 controller', function() {
        var $scope;

        beforeEach(module('myAppRename.view2'));

        //Mocks for the test
        beforeEach(module({
            InfoFactory: {
                getInfo: function() {return  "Factory"; }
            },
            InfoService: {
                getInfo: function() {return  "Service"; }
            },
            CurrentWikiInformation: {
                getInfo: function() {return  "WikiInformation"; }
            }
        }));

        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('View2Ctrl', {$scope: $scope});
        }));

        it('Should have the value Factory', function () {
            expect($scope.infoFactory).toBe('Factory');
        });

        it('Should have the value Service', function () {
            expect($scope.infoService).toBe('Service');
        });

        it('Should have the value WikiInformation', function () {
           expect($scope.wikiInfo).toBe('WikiInformation');
        });
    });
});