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

  $scope.newPiece = {name: "", tempo: 80, done: false, cssClass: "accordionUndone"};
  $scope.pieces = $scope.getField('pieces') ? $scope.getField('pieces') : [];

  $scope.updateLists = function() {
    $scope.donePieces = [];
    $scope.practicePieces = [];
    for (var pieceIdx in $scope.pieces) {
      var piece = $scope.pieces[pieceIdx];
      if (piece.done) {
          $scope.donePieces.push(piece);
      } else {
          $scope.practicePieces.push(piece);
      }
    }
  };

  $scope.markUnmarkAsDone = function(piece) {
    piece.done = !piece.done;
    if (piece.done) {
      piece.cssClass = "accordionDone";
    } else {
      piece.cssClass = "accordionUndone";
    }
    $scope.updatePiece();
  };

  $scope.updatePiece = function() {
    $scope.updateField("pieces", $scope.pieces);
    $scope.updateData();
    $scope.updateLists();
  };

  $scope.updateLists();

  $scope.addToList = function() {
    var newElement = {title: $scope.newPiece.title, targetTempo:parseInt($scope.newPiece.targetTempo, 10)};
    if (newElement.title != "") {
        $scope.pieces.push(newElement);
        $scope.updatePiece();
    }
  };

  $scope.removeFromList = function(item) {
    var index = $scope.pieces.indexOf(item);
    if (index > -1)
    {
      $scope.pieces.splice(index, 1);
    }
    $scope.updatePiece();
  };

}]);
