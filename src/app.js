angular
.module('myApp', ['ui.router', 'ngAnimate'])

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.run(['$rootScope', function($rootScope){
	$(function(){
	 
		$(document).on( 'scroll', function(){
	 
			if ($(window).scrollTop() > 100) {
				$('.scroll-top-wrapper').addClass('show');
			} else {
				$('.scroll-top-wrapper').removeClass('show');
			}
		});

		$('.scroll-top-wrapper').on('click', scrollToTop);

		function scrollToTop() {
			verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
			element = $('body');
			offset = element.offset();
			offsetTop = offset.top;
			$('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
		}
	})

	// $rootScope.on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
	// 	console.log("changing states");
	// 	if(toState === 'video'){
	// 		console.log("to video");
	// 		$('#video-tab').show();
	// 	}
	// });
}])




