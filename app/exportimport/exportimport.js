angular.module('myApp.exportimport', [])

.controller('ExportImportController', ['$scope', '$route', function($scope, $route) {
  var content = JSON.stringify(localStorage);
  var blob = new Blob([ content ], { type : 'text/plain' });
  $scope.url = (window.URL || window.webkitURL).createObjectURL( blob );

  $scope.clickUpload = function() {
    angular.element('#upload').trigger('click');
  };

  $scope.fileNameChanged = function(element) {
    var reader = new FileReader();
    reader.onload = function() {
      try {
        var importedData = reader.result;
        var localStorageJSON = JSON.parse(importedData);
        for (key in  localStorageJSON) {
          localStorage[key] = localStorageJSON[key];
        }
        $route.reload();
      } catch (e) {
        alert("Didn't manage to import your data!");
      }
    };
    reader.readAsText(element.files[0]);
    angular.element('#upload').val('');
  };
}]);
