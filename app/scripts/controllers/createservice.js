'use strict';

angular.module('VMFactoryApp')
	.controller('CreateServiceCtrl', function ($scope, $state, $location, $http) {
		$scope.config = {
			cloud:null,
			repoName:null,
			id:'NewRepo'
		};
		$scope.addImage = function (name) {
			$scope.config.repoName = name;
		};
		
//		$http.jsonp('http://172.16.117.24:8080/patron/service/category/all?callback=JSON_CALLBACK').success(function (data) {
		$http.get('/mock/createservicereal.json').success(function (data) {
			$scope.services = data;
			$scope.serviceIndexes = (function () {
				var tmp = {};
				for (var i = 0, l = data.length; i < l; i++) {
					tmp[data[i].categoryName] = i;
				}
				return tmp;
			}());
			if ($state.current.name === 'user.createservice') {
				$state.go('.selectimage', {
					category: data[0].categoryName
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
		if ($scope.config.repoName) {
			$state.go('.serviceconfiguration');
		}
		$scope.configCategories = [
			{
				Category: 'Service Configuration',
				state: 'serviceconfiguration'
			},
			{
				Category: 'Environment variables',
				state: 'environmentvariables'
			}
		];
	})
	.controller('CloudProviderCtrl', function ($scope) {
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
		$scope.selectedCloudIndex;
		$scope.config.cloud = $scope.clouds[$scope.selectedCloudIndex];
		$scope.saveImage = function(){
			console.log($scope.config);
			$scope.userData.images.push(
				{
					id:$scope.config.id,
					name:$scope.config.serviceName,
					url:$scope.config.cloud.url+$scope.config.id,
					deployed: false,
					status:'stopped',
					since:'-',
					cost: '-',
					schedule: '-'
				}
			)
		}
	});