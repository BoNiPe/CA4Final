'use strict';

angular.module('myAppRename.viewWiki', [])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/viewWiki', {
            templateUrl: 'app/viewWiki/viewWiki.html',
            controller: 'viewWikiController'
        })
            .when('/viewWiki/:id', {
                templateUrl: 'app/viewWiki/viewWikiDetails.html',
                controller: 'viewWikiDetailsController'
            })
            .otherwise({
                redirectTo: "/viewWiki"
            })
    }])

    .controller('viewWikiController', ['$scope', '$http',function ($scope, $http) {
        //var allItems = data;
        $scope.totalItems = 10;
        $scope.maxSize = 5;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $http({
            method: 'GET',
            url: 'api/titleabstract'
        }).
            success(function (data, status, headers, config) {
                $scope.wikis = data;
                $scope.bigTotalItems = $scope.wikis.length;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }])

    .controller('viewWikiDetailsController', ['$scope','$http', '$location',function ($scope,$http,$location) {
        $http({
            method: 'GET',
            url: 'api/wiki/'+$location.path().split("/")[2]
        }).
            success(function (data, status, headers, config) {
                $scope.wikiInformation = data;
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });
    }])
    .filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }});
