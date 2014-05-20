'use strict';

angular.module('luciandipeso.wl')

  .controller('PostCtrl', ['$rootScope', '$scope', '$location', '$http', '$q', '$routeParams', 'version', 'settings', 'post', function($rootScope, $scope, $location, $http, $q, $routeParams, version, settings, post) {
    $scope.$path = $location.path.bind($location);
    $scope.version = version;
    $scope.item = post;
    $rootScope.title = post.title;
  }]);
