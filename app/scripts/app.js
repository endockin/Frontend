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
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ngDialog'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/presentation');
        $stateProvider
            .state('presentation', {templateUrl: 'views/presentation.html', controller: 'HomeCtrl'})
            .state('presentation.main', {url: '/presentation', templateUrl: 'views/presentation/main.html'})
            .state('presentation.help', {url: '/help',templateUrl: 'views/presentation/help.html'})
            .state('presentation.contact', {url: '/contact',templateUrl: 'views/presentation/contact.html'})
            .state('presentation.signup', {url: '/signup',templateUrl: 'views/presentation/signup.html'})
            .state('presentation.features', {url: '/features',templateUrl: 'views/presentation/features.html'})

			.state('user', {templateUrl: 'views/user.html', controller: 'UserCtrl'})
				.state('user.dashboard', {url:'/dashboard', templateUrl: 'views/user/dashboard.html'})
				.state('user.createservice', {url:'/createservice', templateUrl: 'views/user/createservice.html', controller: 'CreateServiceCtrl'})
					.state('user.createservice.selectimage', {url:'/selectimage/{category}', templateUrl: 'views/user/createservice/selectimage.html', controller: 'SelectImageCtrl'})
					.state('user.createservice.configureimage', {url:'/configureimage/{category}', templateUrl: 'views/user/createservice/configureimage.html', controller: 'ConfigureImageCtrl'})
					.state('user.createservice.cloudprovider', {url:'/cloudprovider/{category}', templateUrl: 'views/user/createservice/cloudprovider.html', controller: 'CloudProviderCtrl'});
    })
    .controller('HomeCtrl', function ($scope, $location, ngDialog) {
        $scope.menuClass = function (page) {
            var current = $location.path().substring(1);
            return page === current ? 'active' : '';
        };

        $scope.showLogin = function () {
            ngDialog.open({
                template: 'views/presentation/login.html'
            });
        };

    })
    .controller('UserCtrl', function($scope, $location){
		$scope.menuClass = function (page) {
            var current = $location.path().substring(1);
			current = current.indexOf('/') >=0 ? current.substring(0,current.indexOf('/')) : current;
            return page === current ? 'active' : '';
        };
    });