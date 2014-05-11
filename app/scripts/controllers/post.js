'use strict';

angular.module('luciandipeso.wl')

  .controller('PostCtrl', ['$rootScope', '$scope', '$location', '$http', '$q', '$routeParams', 'PostFactory', 'version', 'settings', function($rootScope, $scope, $location, $http, $q, $routeParams, PostFactory, version, settings) {
    $scope.$path = $location.path.bind($location);
    $scope.version = version;
    $scope.item = {};
    
    $scope.pm = new PostFactory();
    $scope.pm.getPost($routeParams.id).then(function(result) {
      $scope.item = result;
      $rootScope.title = result.title;
    });
  }]);
