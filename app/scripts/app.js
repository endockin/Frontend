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
		$urlRouterProvider.otherwise('presentation');
        //$urlRouterProvider.otherwise('/presentation');
        $stateProvider
            .state('presentation', {templateUrl: 'views/presentation.html', controller: 'HomeCtrl'})
            .state('presentation.main', {url: '/presentation', templateUrl: 'views/presentation/main.html'})
            .state('presentation.help', {url: '/help',templateUrl: 'views/presentation/help.html'})
            .state('presentation.contact', {url: '/contact',templateUrl: 'views/presentation/contact.html'})
            .state('presentation.signup', {url: '/signup',templateUrl: 'views/presentation/signup.html'})
            .state('presentation.features', {url: '/features',templateUrl: 'views/presentation/features.html'})
			.state('presentation.login', {url: 'presentation/login',templateUrl: 'views/presentation/login.html', controller: 'LoginController'})

			.state('user', {templateUrl: 'views/user.html', controller: 'UserCtrl'})
				.state('user.dashboard', {url:'/dashboard', templateUrl: 'views/user/dashboard.html'})
				.state('user.createservice', {url:'/createservice', templateUrl: 'views/user/createservice.html', controller: 'CreateServiceCtrl'})
					.state('user.createservice.selectimage', {url:'/selectimage/{category}', templateUrl: 'views/user/createservice/selectimage.html', controller: 'SelectImageCtrl'})
					.state('user.createservice.configureimage', {url:'/configureimage', templateUrl: 'views/user/createservice/configureimage.html', controller: 'ConfigureImageCtrl'})
					.state('user.createservice.configureimage.serviceconfiguration', {url:'/serviceconfiguration', templateUrl: 'views/user/createservice/configureimage/serviceconfiguration.html'})
					.state('user.createservice.cloudprovider', {url:'/cloudprovider', templateUrl: 'views/user/createservice/cloudprovider.html', controller: 'CloudProviderCtrl'});
    })
    .controller('HomeCtrl', function ($scope, $location, ngDialog) {
        $scope.menuClass = function (page) {
            var current = $location.path().substring(1);
            return page === current ? 'active' : '';
        };

        $scope.showLogin = function () {
		
            ngDialog.open({
                template: 'views/presentation/login.html',
				controller: 'LoginController'
            });
        };

    })
    .controller('UserCtrl', function($scope, $location){
		function checkRows(){
			$scope.userData.selectedRows = false
			var tmp = $scope.userData.images
			for (var i = 0, l = tmp.length; i < l; i++){
				if (tmp[i].selected) {
					$scope.userData.selectedRows = true;
					i = l
				}
			}
		}
		$scope.menuClass = function (page) {
            var current = $location.path().substring(1);
			current = current.indexOf('/') >=0 ? current.substring(0,current.indexOf('/')) : current;
            return page === current ? 'active' : '';
        };
		$scope.selectAll = function(){
			for (var i=0; i < $scope.userData.images.length; i++){
				$scope.userData.images[i].selected = $scope.userData.allSelected;
			}
			checkRows();
		}
		$scope.updateSelectedStatus = function(){
			$scope.userData.allSelected = false;
			checkRows();
		}
		$scope.userData = {
			allSelected : false,
			selectedRows : false,
			images: [
				{
					id:'image1',
					selected:false,
					name:'Something awesome',
					url:'http://cloudy.com/20938kj1p2o389lhsd897o2i34',
					deployed: true,
					running:true,
					since:'20.03.2015 15:00',
					cost: '10$',
					schedule: new Date('2015-06-03T09:00:00.000Z'),
					config: {
						
					}
				},
				{
					id:'image2',
					selected:false,
					name:'Second awesome',
					url:'http://cloudy.com/20938kj1p2o389lhsd897o2i34',
					deployed: false,
					running:false,
					since:'20.03.2015 15:00',
					cost: '10$',
					schedule: new Date('2015-06-03T09:00:00.000Z')
				},
				{
					id:'image3',
					selected:false,
					name:'Can\'t get enough',
					url:'http://cloudy.com/20938kj1p2o389lhsd897o2i34',
					deployed: false,
					running:false,
					since:'20.03.2015 15:00',
					cost: '10$',
					schedule: new Date('2015-06-03T09:00:00.000Z')
				},
				{
					id:'image4',
					selected:false,
					name:'Glory to the Spaghetti monster',
					url:'http://cloudy.com/20938kj1p2o389lhsd897o2i34',
					deployed: true,
					running:true,
					since:'20.03.2015 15:00',
					cost: '10$',
					schedule: new Date('2015-06-03T09:00:00.000Z')
				}
			]
		};
    })
	
	.controller('LoginController', function($scope, $http) {
	
  
	var loginApiUrl='http://172.16.0.200:8080/api/auth/login';


	
$http({url: loginApiUrl,
            method: 'POST',
            data: { "id": "user","password" : "12dea96fec20593566ab75692c9949596833adc9"}, //sha1 hash din user
		    headers: {
                       'Content-Type': 'application/json'
                    },					
			dataType: 'application/json',
			crossDomain : true,
             }).
                success(function (serverData) {
					
				$scope.token= serverData.key ;
				$scope.generatedAt=serverData.generatedAt;
				$scope.validUntil=serverData.validUntil;
				
                    console.log("ServerData:", serverData);  
					
					
    });  	
	
	});
 


