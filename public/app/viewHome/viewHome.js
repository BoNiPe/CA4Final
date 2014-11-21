'use strict';

angular.module('myAppRename.viewHome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewHome', {
    templateUrl: '/partials/partial1',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function() {
});