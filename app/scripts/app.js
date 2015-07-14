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
		//		$urlRouterProvider.otherwise('/');
		$urlRouterProvider.otherwise('/presentation');
		$stateProvider
			.state('presentation', {
				templateUrl: 'views/presentation.html',
				controller: 'HomeCtrl'
			})
			.state('presentation.main', {
				url: '/presentation',
				templateUrl: 'views/presentation/main.html'
			})
			.state('presentation.help', {
				url: '/help',
				templateUrl: 'views/presentation/help.html'
			})
			.state('presentation.contact', {
				url: '/contact',
				templateUrl: 'views/presentation/contact.html'
			})
			.state('presentation.signup', {
				url: '/signup',
				templateUrl: 'views/presentation/signup.html'
			})
			.state('presentation.features', {
				url: '/features',
				templateUrl: 'views/presentation/features.html'
			})

		.state('user', {
				templateUrl: 'views/user.html',
				controller: 'UserCtrl'
			})
			.state('user.dashboard', {
				url: '/dashboard',
				templateUrl: 'views/user/dashboard.html'
			})
			.state('user.createservice', {
				url: '/createservice',
				templateUrl: 'views/user/createservice.html',
				controller: 'CreateServiceCtrl'
			})
			.state('user.createservice.selectimage', {
				url: '/selectimage/{category}',
				templateUrl: 'views/user/createservice/selectimage.html',
				controller: 'SelectImageCtrl'
			})
			.state('user.createservice.configureimage', {
				url: '/configureimage',
				templateUrl: 'views/user/createservice/configureimage.html',
				controller: 'ConfigureImageCtrl'
			})
			.state('user.createservice.configureimage.serviceconfiguration', {
				url: '/serviceconfiguration',
				templateUrl: 'views/user/createservice/configureimage/serviceconfiguration.html'
			})
			.state('user.createservice.cloudprovider', {
				url: '/cloudprovider',
				templateUrl: 'views/user/createservice/cloudprovider.html',
				controller: 'CloudProviderCtrl'
			});
	})
	.run(function ($rootScope) {
		$rootScope.ip = 'http://rocj-inolab-d01:8082';
		$rootScope.token = null;
	})
	.controller('HomeCtrl', function ($state, $scope, $location, ngDialog) {

		$scope.menuClass = function (page) {
			var current = $location.path().substring(1);
			return page === current ? 'active' : '';
		};
		$scope.loginData = {};
		$scope.showLogin = function () {
			ngDialog.open({
				template: 'views/presentation/login.html',
				scope: $scope,
				controller: 'LoginCtrl'
			});
		};
	})
	.controller('LoginCtrl', function ($rootScope, $scope, $http, $state, connect) {
		$scope.inputActive = function (data) {
			if (data.length) {
				return 'input--filled';
			}
		};
		$scope.login = function () {
			connect
				.login($scope.formData.username, $scope.formData.password)
				.then(function () {
					$state.go('user.dashboard');
					$scope.closeThisDialog();
				});
		};
	})
	.controller('UserCtrl', function ($rootScope, $scope, $location, connect) {
		function checkRows() {
			$scope.userData.selectedRows = false;
			var tmp = $scope.userData.images;
			for (var i = 0, l = tmp.length; i < l; i++) {
				if (tmp[i].selected) {
					$scope.userData.selectedRows = true;
					i = l;
				}
			}
		}
		$scope.menuClass = function (page) {
			var current = $location.path().substring(1);
			current = current.indexOf('/') >= 0 ? current.substring(0, current.indexOf('/')) : current;
			return page === current ? 'active' : '';
		};
		$scope.selectAll = function () {
			for (var i = 0; i < $scope.userData.images.length; i++) {
				$scope.userData.images[i].selected = $scope.userData.allSelected;
			}
			checkRows();
		};
		$scope.updateSelectedStatus = function () {
			$scope.userData.allSelected = false;
			checkRows();
		};

		$scope.userData = {
			allSelected: false,
			selectedRows: false,
			images: []
		};

		connect.request('/api/fleet').then(function (data) {
			for (var i = 0, l = data.length; i < l; i++) {
				var tmp = data[i];
				$scope.userData.images[i] = {
					id: tmp.name.substring(1),
					selected: false,
					name: tmp.name.substring(1),
					url: tmp.urls,
					deployed: tmp.deployed,
					running: tmp.status,
					since: tmp.statusSince,
					cost: '0',
					schedule: null
				};
			}
		});
	});