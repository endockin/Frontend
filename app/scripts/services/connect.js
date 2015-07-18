'use strict';

angular.module('VMFactoryApp')
	.service('connect', function ($http, $state, genericMessages, $cookies) {

	
		var baseUrl = 'http://rocj-inolab-d01:8082';
		
		var login = function (usr, pass) {
			return $http({
				url: baseUrl + '/api/auth/login',
				method: 'POST',
				data: {
					'email': usr,
					'password': pass
				},
				headers: {
					'Content-Type': 'application/json'
				},
				dataType: 'application/json',
				crossDomain: true
			}).then(function (response) {
				var data = response.data;
				//store auth in cookie 
				 var validity = new Date(data.validUntil);
                 document.cookie = 'mytoken=' + data.key + '; expires=' + validity.toUTCString() + '; path=/';
				 
				return response;
			}, function(response){
				console.log('data error');
				return response;
			});
		};
		
		var logout = function(){
			  $cookies.remove('mytoken')
		};
		
		var request = function (apiAdr) {
			return $http({
				url: baseUrl + apiAdr,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Patron-Api-Key': $cookies.get('mytoken')
				},
				dataType: 'application/json',
				crossDomain: true
			}).then(function (response) {
				return response.data;
			});
		};
	
		var post = function(apiAdr, data){
			return $http({
				url: baseUrl + apiAdr,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Patron-Api-Key': $cookies.get('mytoken')
				},
				dataType: 'application/json',
				data: data
				
			}).then(function (response) {
				return response.data;
			});
		};
	

		var isAuthenticated = function(){
		//check if cookie hasn't expired
			if ($cookies.get('mytoken')!=null){
				return true;
				} 
			else {
					$state.go('presentation.main');
					genericMessages.message = '<h1>You have been logged out</h1><p>Your session may have expired, please try logging back in</p>';
					genericMessages.type = 'error';
					return false;
				}
		
		};


		return {
			login: login,
			logout: logout,
			request: request,
			post: post,
			isAuthenticated: isAuthenticated
		};
	});