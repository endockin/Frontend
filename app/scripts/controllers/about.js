'use strict';

/**
 * @ngdoc function
 * @name cloudEApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cloudEApp
 */
angular.module('cloudEApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
