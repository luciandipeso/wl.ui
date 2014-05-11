'use strict';

angular.module('luciandipeso.wl', ['config', 'ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'mgcrea.ngStrap', 'chieffancypants.loadingBar', 'infinite-scroll', 'angularMoment', 'google-maps'])

  .constant('version', 'v0.1.0')

  .run(['settings', function(settings) {
    var head = angular.element('head'); 

    if(head.scope())
    {
      head.append(
        $compile(
          '<link rel="alternate" type="application/rss+xml"' +
          ' title="RSS 2.0" href="' + settings.apiBase + '/feeds/posts">'
        )(scope));
    }
  }])

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

