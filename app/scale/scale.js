'use strict';

var major_progression = [0, 2, 4, 5, 7, 9, 11, 12, 11, 9, 7, 5, 4, 2, 0];
var minor_progression = [0, 2, 3, 5, 7, 8, 11, 12, 11, 8, 7, 5, 3, 2, 0];
var melodic_minor_progression = [0, 2, 3, 5, 7, 9, 11, 12, 10, 8, 7, 5, 3, 2, 0];

var major_fifths = ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
var minor_fifths = ['A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'Bb', 'F', 'C', 'G', 'D'];

var major_chromatic = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
var minor_chromatic = ['A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

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
  $scope.selected = cookie.hasOwnProperty('selected') ? cookie.selected : [];
  $scope.majors = major_chromatic;
  $scope.minors = minor_chromatic;

  $scope.addToList = function(key) {
    var newElement = {key: key, tempo: $scope.tempo}
    $scope.selected.push(newElement);
    cookie.selected = $scope.selected;
    $cookies.putObject('scales', cookie);
  };
}]);
