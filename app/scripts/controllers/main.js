'use strict';

/**
 * @ngdoc function
 * @name VMFactoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the VMFactoryApp
 */
angular.module('VMFactoryApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
