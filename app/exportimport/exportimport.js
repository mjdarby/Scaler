angular.module('myApp.exportimport', [])

.controller('ExportImportController', ['$scope', function($scope) {
  var content = JSON.stringify(localStorage);
  var blob = new Blob([ content ], { type : 'text/plain' });
  $scope.url = (window.URL || window.webkitURL).createObjectURL( blob );
}]);
