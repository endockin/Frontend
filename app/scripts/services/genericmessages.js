'use strict';

/**
 * @ngdoc service
 * @name VMFactoryApp.genericMessages
 * @description
 * # genericMessages
 * Factory in the VMFactoryApp.
 */
angular.module('VMFactoryApp')
	.factory('genericMessages', function () {
		
		return {
			message: null,
			type: 'success' // 'error' or 'success'
		};
	});