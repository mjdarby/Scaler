'use strict';

angular.module('myApp.pieces', ['ngRoute', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pieces', {
    templateUrl: 'pieces/pieces.html',
    controller: 'PiecesCtrl'
  });
}])

.controller('PiecesCtrl', ['$scope', function($scope) {
  $scope.debug = false;

  $scope.localStorage = localStorage;

  $scope.updateField = function(field, value) {
    $scope.localStorage.setItem(field, JSON.stringify(value));
  };

  $scope.updateData = function() {
    // Legacy, keeping for when we move to databases
  };

  $scope.getField = function(field) {
    return JSON.parse($scope.localStorage.getItem(field));
  };

  $scope.newPiece = {name: "", tempo: 80};
  $scope.pieces = $scope.getField('pieces') ? $scope.getField('pieces') : [];

  $scope.updatePiece = function() {
    $scope.updateField("pieces", $scope.pieces);
    $scope.updateData();
  };

  $scope.addToList = function() {
    var newElement = {title: $scope.newPiece.title, tempo:parseInt($scope.newPiece.tempo, 10)};
    $scope.pieces.push(newElement);
    $scope.updateField("pieces", $scope.pieces);
    $scope.updateData();
  };

  $scope.removeFromList = function(item) {
    var index = $scope.pieces.indexOf(item);
    if (index > -1)
    {
      $scope.pieces.splice(index, 1);
    }
    $scope.updateField("pieces", $scope.pieces);
    $scope.updateData();
  };

}]);
