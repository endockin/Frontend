'use strict';

/**
 * @ngdoc function
 * @name VMFactoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the VMFactoryApp
 */
angular.module('VMFactoryApp')
  .controller('FeaturesCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
