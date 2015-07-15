'use strict';

angular.module('VMFactoryApp')
	.service('connect', function ($http, $state) {

		var userSession = {
			token: null,
			generatedAt: null,
			validUntil: null
		};
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
				console.log(data);	
				userSession.token = data.key;
				userSession.generatedAt = data.generatedAt;
				userSession.validUntil = data.validUntil;
			});
		};
		
		var logout = function(){
			userSession.token=null;
			userSession.generatedAt=null;
			userSession.validUntil=null;
		};
		
		var request = function (apiAdr) {
			return $http({
				url: baseUrl + apiAdr,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Patron-Api-Key': userSession.token
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
					'X-Patron-Api-Key': userSession.token
				},
				dataType: 'application/json',
				data: data
				
			}).then(function (response) {
				return response.data;
			});
		}
	
		var isAuthenticated = function(){
			if (userSession.token && userSession.validUntil >= Date.now()) { 
				return true;
			} else {
				$state.go('presentation.main');
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