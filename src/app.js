angular
.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate'])

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.run(['$rootScope', 'ytScrollTo', function($rootScope, ytScrollTo){
	// $(function(){	 
	// 	$(document).on( 'scroll', function(){	 
	// 		if ($(window).scrollTop() > 100) {
	// 			$('.scroll-top-wrapper').addClass('show');
	// 		} else {
	// 			$('.scroll-top-wrapper').removeClass('show');
	// 		}
	// 	});

	// 	$('.scroll-top-wrapper').on('click', scrollToTop);

	// 	function scrollToTop() {
	// 		verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	// 		element = $('body');
	// 		offset = element.offset();
	// 		offsetTop = offset.top;
	// 		$('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
	// 	}
	// })
	// window.onscroll = ytScrollTo().addScrollClass();
}])




