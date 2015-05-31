'use strict';

/**
 * @ngdoc overview
 * @name cloudEApp
 * @description
 * # cloudEApp
 *
 * Main module of the application.
 */
angular
    .module('VMFactoryApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/contact', {
              templateUrl: 'views/contact.html',
              controller: 'ContactCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('HomeController', function ($scope, $location) {
        $scope.menuClass = function (page) {
            var current = $location.path().substring(1);
            return page === current ? 'active' : '';
        };
    });