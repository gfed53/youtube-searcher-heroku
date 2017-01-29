(function(){
	angular
	.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate'])

	.config(['$httpProvider', '$compileProvider', function($httpProvider, $compileProvider){
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$compileProvider.debugInfoEnabled(false);
	}])

	.run(['$timeout', '$rootScope', 'ytInitAPIs', function($timeout, $rootScope, ytInitAPIs){
		$rootScope.$on('$stateChangeSuccess', function(){
			window.scrollTo(0,0);
		});
		ytInitAPIs.check()
		.then(() => {
			//Do Nothing
		});
		
	}]);
})();




