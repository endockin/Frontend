'use strict';

/**
 * @ngdoc overview
 * @name VMFactoryApp
 * @description
 * # VMFactoryApp
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
            .when('/features', {
                templateUrl: 'views/features.html',
                controller: 'FeaturesCtrl'
            })
            .when('/help', {
              templateUrl: 'views/help.html',
              controller: 'HelpCtrl'
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