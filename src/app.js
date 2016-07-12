angular
.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate'])

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

//For testing
.run(['$timeout', 'ytFixedHeader', '$rootScope', function($timeout, ytFixedHeader, $rootScope){
	
	$timeout(function(){
		ytFixedHeader().fixedAdjustMenu();

	}, 1000);

	$rootScope.$on('$stateChangeSuccess', function(){
		window.scrollTo(0,0);
	});
	
}]);




