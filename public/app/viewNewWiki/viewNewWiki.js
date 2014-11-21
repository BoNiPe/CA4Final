angular.module('myAppRename.viewNewWiki', ['ngRoute','ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/viewNewWiki', {
                templateUrl: 'app/viewNewWiki/viewNewWiki.html',
                controller: 'viewNewWikiController'
            })
    }])

    .controller('viewNewWikiController', ['$scope', '$http', function ($scope, $http) {
        $scope.newWiki = {};

        $scope.postWiki = function () {
            console.log(JSON.stringify($scope.newWiki));
            var postWiki = $scope.newWiki;
            $http({
                method: 'POST',
                url: 'api/newWiki',
                data: postWiki
            }).
                success(function (data, status, headers, config) {
                    $scope.users = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }
    }])