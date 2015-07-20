'use strict';

var major_progression = [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0];
var minor_progression = [0, 2, 3, 5, 7, 8, 11, 12, 11, 8, 7, 5, 3, 2, 0];
var melodic_minor_progression = [0, 2, 3, 5, 7, 9, 11, 12, 10, 8, 7, 5, 3, 2, 0];

var major_fifths = ['C', 'G', 'D', 'A', 'E', 'B', 'G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F'];
var minor_fifths = ['A', 'E', 'B', 'F♯', 'C♯', 'G♯', 'D♯', 'B♭', 'F', 'C', 'G', 'D'];

var major_chromatic = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
var minor_chromatic = ['A', 'B♭', 'B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯'];

var myFace = function() {
  return "what";
}

angular.module('myApp.scale', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/scale', {
    templateUrl: 'scale/scale.html',
    controller: 'ScaleCtrl'
  });
}])

.controller('ScaleCtrl', ['$scope', '$cookies', function($scope, $cookies) {
  var cookie = $cookies.getObject('scales') || {};
  $scope.major = "";
  $scope.tempo = 80;
  $scope.tempoIncrease = 4;
  $scope.selected = cookie.hasOwnProperty('selected') ? cookie.selected : [];
  $scope.scalesPerDay = cookie.hasOwnProperty('scalesPerDay') ? cookie.selected : 3;
  $scope.majors = major_chromatic;
  $scope.minors = minor_chromatic;

  $scope.addToList = function(key, majorminor) {
    var newElement = {key: key + " " + majorminor, tempo: parseInt($scope.tempo, 10)};
    $scope.selected.push(newElement);
    cookie.selected = $scope.selected;
    $cookies.putObject('scales', cookie);
  };

  $scope.removeFromList = function(item) {
    var index = $scope.selected.indexOf(item);
    if (index > -1)
    {
      $scope.selected.splice(index, 1);
    }
    cookie.selected = $scope.selected;
    $cookies.putObject('scales', cookie);
  };

  $scope.increaseTempo = function(item) {
    var index = $scope.selected.indexOf(item);
    if (index > -1)
    {
      $scope.selected.splice(index, 1);
      item.tempo += $scope.tempoIncrease;
      $scope.selected.push(item);
    }
    cookie.selected = $scope.selected;
    $cookies.putObject('scales', cookie);
  };

}]);
