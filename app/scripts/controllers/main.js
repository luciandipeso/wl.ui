'use strict';

angular.module('luciandipeso.wl')

  .controller('MainCtrl', ['$scope', '$location', '$http', '$q', 'PostFactory', 'version', 'settings', 'firstPage', function($scope, $location, $http, $q, PostFactory, version, settings, firstPage) {
    $scope.$path = $location.path.bind($location);
    $scope.version = version;
    $scope.pm = new PostFactory(firstPage, 1);
  }]);
