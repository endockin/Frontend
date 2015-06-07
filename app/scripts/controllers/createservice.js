'use strict';

angular.module('VMFactoryApp')
	.controller('CreateServiceCtrl', function ($scope, $state, $location, $http) {
		//$state.go('user.createservice.selectimage');
		$scope.config = {}
		$scope.addImage = function (name) {
			$scope.config.repoName = name
		}
		$http.get('/mock/createservice.json').success(function (data) {
			$scope.services = data;
			$scope.serviceIndexes = (function () {
				var tmp = {}
				for (var i = 0, l = data.length; i < l; i++) {
					tmp[data[i].Category] = i
				}
				return tmp;
			}());
			console.log('go?');
			$state.go('.selectimage',{category:data[0].Category})
		});

	})
	.controller('SelectImageCtrl', function ($scope, $state, $location) {
		$scope.tabClass = function (page) {
			var current = $location.path().substring($location.path().lastIndexOf('/') + 1);
			return page === current ? 'active' : '';
		};
		$scope.servicesCategory = $state.params.category;
	})
	.controller('ConfigureImageCtrl', function ($scope, $state, $location) {
		$scope.configCategories = [
			{
				Category: 'Service Configuration'
			},
			{
				Category: 'Environment variables'
			}
		]
		$scope.tabClass = function (page) {
			var current = $location.path().substring($location.path().lastIndexOf('/') + 1);
			return page === current ? 'active' : '';
		};
	})
	.controller('CloudProviderCtrl', function ($scope, $state, $location, $http) {
		//
	});