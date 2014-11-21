'use strict';

/* Factories */

angular.module('myAppRename.factories', []).
  factory('InfoFactory', function () {
    var info = "Hello World from a Factory";
    var getInfo = function getInfo(){
      return info;
    }
    return {
      getInfo: getInfo
    }
  })

    .factory('CurrentWikiInformation', function () {
      var info = "Hello World from CurrentWikiInformation";
      var getInfo = function getInfo() {
        return info;
      }
      var setUser = function(newWiki) {
        info = newWiki;
      }
      return {
        setInfo: setUser,
        getInfo: getInfo
      }
    });