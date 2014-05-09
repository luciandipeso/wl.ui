'use strict';

angular.module('luciandipeso.wl', ['ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'mgcrea.ngStrap', 'chieffancypants.loadingBar', 'infinite-scroll', 'angularMoment', 'google-maps'])

  .constant('version', 'v0.1.0')
  .constant('settings', {
    apiBase: "http://localhost:8080"
  })

  .config(function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(false);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/post/:id', {
        controller: 'PostCtrl',
        templateUrl: 'views/post.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  });

