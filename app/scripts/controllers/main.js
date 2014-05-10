'use strict';

angular.module('luciandipeso.wl')

  .controller('MainCtrl', function($scope, $location, $http, $q, PostFactory, version, settings) {
    $scope.$path = $location.path.bind($location);
    $scope.version = version;
    $scope.pm = new PostFactory();
  });
