'use strict';

angular.module('VMFactoryApp')
	.controller('CreateServiceCtrl', function ($scope, $state, $location, $http) {

		$state.go($scope.globals.savedServiceLocation);
		$scope.$on('$stateChangeSuccess', function () {
			$scope.globals.savedServiceLocation = $state.current.name
			$scope.category = $state.params.category;
		});

		$scope.tabClass = function (page) {
			var current = $location.path().substring(1);
			return page === current ? 'active' : '';
		};
	
		

		$http.get('/mock/createservice.json').success(function (data) {
			$scope.services = data;
			$scope.serviceIndexes = (function () {
				var tmp = {}
				for (var i = 0, l = data.length; i < l; i++) {
					tmp[data[i].Category] = i
				}
				return tmp;
			}())
			$scope.category = $scope.services[0].Category
			
		});

	});