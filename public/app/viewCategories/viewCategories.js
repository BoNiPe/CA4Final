'use strict';

angular.module('myAppRename.viewCategories', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/viewCategories', {
                templateUrl: '/viewCategories/viewCategories.html',
                controller: 'CategoriesController'
            });
    }])

    .controller('CategoriesController', ['$scope', '$http', function ($scope, $http) {
        $scope.alphabet = "ALL Number A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ");
        var localCategories = [];



        $http({
            method: 'GET',
            url: 'api/categories'
        }).
            success(function (data, status, headers, config) {
                localCategories = data;
                $scope.allCategories = data;
                $scope.allCategories.splice(0, 1);
            }).
            error(function (data, status, headers, config) {
                $scope.error = data;
            });

        $scope.getTitlesOfCategories = function (category) {
            $http({
                method: 'GET',
                url: 'api/categories/' + category
            }).
                success(function (data, status, headers, config) {
                    $scope.allTitles = data;
                }).
                error(function (data, status, headers, config) {
                    $scope.error = data;
                });
        }

        $scope.showParticularCategories = function (letter) {
            var toBeFilled = [];
            if (letter === "ALL") {
                $scope.allCategories = localCategories;
            } else if (letter === "Number") {
                for (var i = 0; i < localCategories.length; i++) {
                    if(!isNaN(localCategories[i].substring(0, 1))){
                        toBeFilled.push(localCategories[i])
                    }
                }
                $scope.allCategories = toBeFilled;
            }
            else {
                for (var i = 0; i < localCategories.length; i++) {
                    if (localCategories[i].indexOf(letter) == 0) {
                        toBeFilled.push(localCategories[i])
                    }
                }
                $scope.allCategories = toBeFilled;
            }
        }
    }])