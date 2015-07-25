'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.home',
  'myApp.scale',
  'myApp.pieces',
  'myApp.exportimport'
]).
config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);
