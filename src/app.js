/*jshint esversion: 6 */

(function(){
	angular
	.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate'])

	.config(['$httpProvider', '$compileProvider', ($httpProvider, $compileProvider) => {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$compileProvider.debugInfoEnabled(false);
	}])

	.run(['$timeout', '$rootScope', 'ytInitAPIs', ($timeout, $rootScope, ytInitAPIs) => {
		$rootScope.$on('$stateChangeSuccess', () => {
			window.scrollTo(0,0);
		});
		ytInitAPIs.check()
		.then(() => {
			//Do Nothing
		});
		
	}]);
})();




