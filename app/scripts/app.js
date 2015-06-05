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
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'ngDialog'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('/', {
                url: '/',
                templateUrl: 'views/main.html'
            })
            .state('/help', {
                url: '/help',
                templateUrl: 'views/help.html'
            })
            .state('/contact', {
                url: '/contact',
                templateUrl: 'views/contact.html'
            })
            .state('/features', {
                url: '/features',
                templateUrl: 'views/features.html'
            })
    })
    .controller('HomeController', function ($scope, $location, ngDialog) {
//        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
//        if (!String.prototype.trim) {
//            (function () {
//                // Make sure we trim BOM and NBSP
//                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
//                String.prototype.trim = function () {
//                    return this.replace(rtrim, '');
//                };
//            })();
//        }
//
//        [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
//            // in case the input is already filled..
//            if (inputEl.value.trim() !== '') {
//                classie.add(inputEl.parentNode, 'input--filled');
//            }
//
//            // events:
//            inputEl.addEventListener('focus', onInputFocus);
//            inputEl.addEventListener('blur', onInputBlur);
//        });
//
//        function onInputFocus(ev) {
//            classie.add(ev.target.parentNode, 'input--filled');
//        }
//
//        function onInputBlur(ev) {
//            if (ev.target.value.trim() === '') {
//                classie.remove(ev.target.parentNode, 'input--filled');
//            }
//        }


        $scope.menuClass = function (page) {
            var current = $location.path().substring(1);
            return page === current ? 'active' : '';
        };

        $scope.showLogin = function () {
            ngDialog.open({
                template: 'views/login.html'
            });
        };

    });