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

angular.module('myApp.scale', ['ngRoute', 'ngCookies', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/scale', {
    templateUrl: 'scale/scale.html',
    controller: 'ScaleCtrl'
  });
}])

.controller('ScaleCtrl', ['$scope', '$cookies', function($scope, $cookies) {
  $scope.debug = false;

  var cookie = $cookies.getObject('scaler') || {};
  $scope.major = "";
  $scope.tempo = 80;
  $scope.tempoIncrease = 4;
  $scope.selected = cookie.hasOwnProperty('selected') ? cookie.selected : [];
  $scope.keysPerDay = cookie.hasOwnProperty('keysPerDay') ? cookie.keysPerDay : 3;
  $scope.doneToday = cookie.hasOwnProperty('doneToday') ? cookie.doneToday : 0;

  if (cookie.hasOwnProperty('lastUsedDate')) {
    $scope.lastUsedDate = new Date(cookie.lastUsedDate);
  } else {
    $scope.lastUsedDate = new Date()
    $scope.lastUsedDate.setDate($scope.lastUsedDate.getDate() - 1);
  }
  $scope.lastUsedDate.setHours(0,0,0,0); // In case the time is non-pure date

  $scope.majors = major_chromatic;
  $scope.minors = minor_chromatic;

  $scope.newDay = function() {
    $scope.doneToday = 0;
  };

  var today = new Date();
  today.setHours(0,0,0,0);
  if ($scope.lastUsedDate != today) {
    $scope.newDay();
  }

  $scope.changeKeysPerDay = function() {
    cookie.keysPerDay = $scope.keysPerDay;
    $cookies.putObject('scaler', cookie);
  };

  $scope.addToList = function(key, majorminor) {
    var newElement = {key: key + " " + majorminor, tempo: parseInt($scope.tempo, 10)};
    $scope.selected.push(newElement);
    cookie.selected = $scope.selected;
    $cookies.putObject('scaler', cookie);
  };

  $scope.removeFromList = function(item) {
    var index = $scope.selected.indexOf(item);
    if (index > -1)
    {
      $scope.selected.splice(index, 1);
    }
    cookie.selected = $scope.selected;
    $cookies.putObject('scaler', cookie);
  };

  $scope.increaseTempo = function(item) {
    var index = $scope.selected.indexOf(item);
    if (index > -1)
    {
      $scope.selected.splice(index, 1);
      item.tempo += $scope.tempoIncrease;
      $scope.selected.push(item);
      $scope.doneToday += 1;
    }
    cookie.selected = $scope.selected;
    cookie.lastUsedDate = new Date();
    cookie.lastUsedDate.toISOString();
    cookie.doneToday = $scope.doneToday;
    $cookies.putObject('scaler', cookie);
  };

}]);
