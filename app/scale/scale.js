'use strict';

angular.module('myApp.scale', ['ngRoute', 'ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/scale', {
    templateUrl: 'scale/scale.html',
    controller: 'ScaleCtrl'
  });
}])

.controller('ScaleCtrl', ['$scope', '$cookies', function($scope, $cookies) {
  $cookies.put('MyCookie', 'Dave');
  $scope.testVal = $cookies.get('MyCookie');
}]);
