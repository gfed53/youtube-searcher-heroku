angular
.module('myApp', ['ui.router', 'ngAnimate'])

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.run(function(){
	// function($) { 
	// 	$.fn.goTo = function() {
	// 	 $(this)[0].scrollIntoView(true); return this;
	// 	   } 
	// 	})(jQuery);
})




