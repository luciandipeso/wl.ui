'use strict';

angular.module('luciandipeso.wl', ['wl.config', 'ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'mgcrea.ngStrap', 'chieffancypants.loadingBar', 'infinite-scroll', 'angularMoment', 'google-maps'])

  .constant('version', 'v0.1.0')

  .run(['$rootScope', '$route', 'settings', function($rootScope, $route, settings) {
    var head = angular.element('head');

    head.append(
      '<link rel="alternate" type="application/rss+xml"' +
      ' title="RSS 2.0" href="' + settings.apiBase + '/feeds/posts">'
    );

    $rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute) {
      $rootScope.title = $route.current.title;
    });
  }])

  .config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {

    $httpProvider.interceptors.push('restRecoverer');

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        title: 'Do you know where he is?'
      })
      .when('/post/:id', {
        controller: 'PostCtrl',
        templateUrl: 'views/post.html',
        title: 'Essay'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        title: 'About'
      })
      .when('/404', {
        templateUrl: 'views/404.html',
        title: 'File Not Found'
      })
      .otherwise({
        redirectTo: '/404',
        templateUrl: 'views/404.html',
        title: 'File Not Found'
      });

  }]);

