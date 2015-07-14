'use strict';

angular.module('VMFactoryApp')
	.service('connect', function ($http) {

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
				userSession.token = data.key;
			});
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

		return {
			login: login,
			request: request,
		};
	});