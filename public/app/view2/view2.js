'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'app/view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl',['$scope','InfoFactory','InfoService', 'CurrentWikiInformation', function($scope,InfoFactory,InfoService, CurrentWikiInformation) {
    $scope.infoFactory = InfoFactory.getInfo();
    $scope.infoService = InfoService.getInfo();
    $scope.wikiInfo = CurrentWikiInformation.getInfo();
  }]);
