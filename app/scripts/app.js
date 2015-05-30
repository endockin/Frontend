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
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('HomeController', function ($scope, $location) {
        $scope.menuClass = function (page) {
            var current = $location.path().substring(1);
            console.log(page,current);
            return page === current ? "active" : "";
        };
    });