'use strict';

angular.module('luciandipeso.wl')
  .factory('restRecoverer', ['$q', '$location', function($q, $location) {
    var interceptor = {
      responseError: function(response) {
        $location.path('404');
        return $q.reject(response);
      }
    }

    return interceptor;
  }]);