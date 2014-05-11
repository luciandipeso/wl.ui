'use strict';

angular.module('luciandipeso.wl')

  .controller('PostCtrl', ['$scope', '$location', '$http', '$q', '$routeParams', 'PostFactory', 'version', 'settings', function($scope, $location, $http, $q, $routeParams, PostFactory, version, settings) {
    $scope.$path = $location.path.bind($location);
    $scope.version = version;
    $scope.item = {};
    
    $scope.pm = new PostFactory();
    $scope.pm.getPost($routeParams.id).then(function(result) {
      $scope.item = result;
    });
  }]);
