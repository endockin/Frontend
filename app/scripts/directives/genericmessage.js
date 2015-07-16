'use strict';

/**
 * @ngdoc directive
 * @name VMFactoryApp.directive:genericMessage
 * @description
 * # genericMessage
 */
angular.module('VMFactoryApp')
	.directive('genericMessage', function (genericMessages) {
		return {
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				if (genericMessages.message) {
					var messageType = genericMessages.type;
					element.html('<div class="row border-none transition-short theme-area theme-bg-' + messageType + '"><div class="main-container">' + genericMessages.message + '</div></div>');
					var container = element.children().children()
					container.addClass('relative');
					container.append('<button title="close message" class="btn-naked pos-tr"><i class="fa fa-close"></i></button>');
					var btnClose = container.children('button').on('click', function(){
						var tmp = element.children();
						var tmp0 = element.children()[0];
						console.log(tmp);
						tmp.css('height',tmp0.offsetHeight+'px');
						setTimeout(function(){tmp.css('height','0')},10);
					});
				}
			}
		};
	});