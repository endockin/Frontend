'use strict';

angular.module('VMFactoryApp')
	.controller('CreateServiceCtrl', function ($rootScope, $scope, $state, $location, $http) {
	$scope.config = {
		cloud: null,
		repoName: null,
		id: 'NewRepo',
		numberOfContainers: 1,
		memory: 256,
		CPUshares: 1,
		diskSpace: 512
	};
	$scope.addImage = function (name) {
		$scope.config.id = name;
	};
	//		$http.jsonp('http://172.16.0.200:8080/api/category?callback=JSON_CALLBACK').success(function (data) {
	//		$http.get('/mock/createservicereal.json').success(function (data) {
	//		$httpProvider.defaults.headers.common['X-Patron-Api-Key'] = $rootScope.token;
	$http({
			url: $rootScope.ip + '/api/category',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-Patron-Api-Key': $rootScope.token
			},
			dataType: 'application/json',
			crossDomain: true
		}).success(function (data) {
			$scope.services = data;
			$scope.serviceIndexes = (function () {
				var tmp = {};
				for (var i = 0, l = data.length; i < l; i++) {
					tmp[data[i].name] = i;
				}
				return tmp;
			}());
			if ($state.current.name === 'user.createservice') {
				$state.go('.selectimage', {
					category: data[0].name
				});
			}
		});
		$scope.tabClass = function (page) {
			var current = $location.path().substring($location.path().lastIndexOf('/') + 1);
			return page === current ? 'active' : '';
		};
		if (!$scope.config.repoName) {
			$state.go('user.createservice');
		}
	})
	.controller('SelectImageCtrl', function ($scope, $state) {
		$scope.servicesCategory = $state.params.category;
	})
	.controller('ConfigureImageCtrl', function ($scope, $state) {
		$scope.goToStep3 = function(isValid){
			if(isValid){
				$state.go('user.createservice.cloudprovider');
			}
		};
		if ($scope.config.id) {
			$state.go('.serviceconfiguration');
		}
		$scope.configCategories = [
			{
				Category: 'Service Configuration',
				state: 'serviceconfiguration'
			}
		];
	})
	.controller('CloudProviderCtrl', function ($rootScope, $scope, $http, $state) {
		$scope.clouds = [
			{
				id:'cloud1',
				name:'Endava Cloud',
				url:'http://cloud.endava.com',
				description: 'Sugar plum wafer toffee chocolate tiramisu cookie. Danish marzipan jelly pastry jelly-o. Jelly-o tiramisu marshmallow sugar plum muffin marshmallow halvah chocolate bar. Cake apple pie ice cream bonbon cake dragée. ',
				img:'http://www.endava.com/~/media/Common/logo.ashx'
			},
			{
				id:'cloud2',
				name:'Amazon Cloud',
				url:'http://cloud.amazon.com',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, sapiente.',
				img:'https://images-na.ssl-images-amazon.com/images/G/01/digital/adrive/images/landing-page/cd_logo_nav.png'
			},
			{
				id:'cloud3',
				name:'Digital Ocean',
				url:'http://cloud.digitalocean.com',
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, sapiente.',
				img:'https://www.digitalocean.com/assets/images/logos-badges/png/DO_Logo_Vertical_Blue-75e0d68b.png'
			}
		];
		$scope.selectedCloudIndex = null;
		$scope.config.cloud = $scope.clouds[$scope.selectedCloudIndex];
	
		$http({
				url: $rootScope.ip + '/api/fleet',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Patron-Api-Key': $rootScope.token
				},
				data: {
					  blueprintName: $scope.config.id,
					  cpuPerShip: $scope.config.CPUshares,
					  diskPerShip: $scope.config.diskSpace,
					  memoryPerShip: $scope.config.memory,
					  name: $scope.config.serviceName,
					  numberOfShips: $scope.config.numberOfContainers
				},
				dataType: 'application/json'
			}).success(function(data){
			$scope.services = data;
			$scope.serviceIndexes = (function () {
				var tmp = {};
				for (var i = 0, l = data.length; i < l; i++) {
					tmp[data[i].name] = i;
				}
				return tmp;
			}());
			if ($state.current.name === 'user.createservice') {
				$state.go('.selectimage', {
					category: data[0].name
				});
			}
		});
	
	});