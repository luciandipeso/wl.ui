'use strict';

angular.module('luciandipeso.wl', ['wl.config', 'ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'mgcrea.ngStrap', 'chieffancypants.loadingBar', 'infinite-scroll', 'angularMoment', 'google-maps'])

  .constant('version', 'v0.2.0')

  .run(['$rootScope', '$route', 'settings', function($rootScope, $route, settings) {
    var head = angular.element('head');

    head.append(
      '<link rel="alternate" type="application/rss+xml"' +
      ' title="RSS 2.0" href="/feeds/posts">'
    );

    $rootScope.$on('$routeChangeSuccess', function(currentRoute, previousRoute) {
      $rootScope.title = $route.current.title;
    });
  }])

  .config(['$locationProvider', '$routeProvider', '$httpProvider', function($locationProvider, $routeProvider, $httpProvider) {

    $httpProvider.interceptors.push('restRecoverer');

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        templateUrl: 'views/home.html',
        title: 'Do you know where he is?',
        resolve: {
          posts: ['PostFactory', function(PostFactory) {
            var pm = new PostFactory();
            return pm.getPosts(1);
          }]
        }
      })
      .when('/post/:id', {
        controller: 'PostCtrl',
        templateUrl: 'views/post.html',
        title: 'Essay',
        resolve: {
          post: ['$route', 'PostFactory', function($route, PostFactory) {
            var pm = new PostFactory();
            return pm.getPost($route.current.params.id);
          }]
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        title: 'About'
      })
      .when('/projects', {
        templateUrl: 'views/projects.html',
        title: 'Projects'
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

