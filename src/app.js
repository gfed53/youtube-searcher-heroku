/*jshint esversion: 6 */

(function(){
	angular
	.module('myApp', ['ui.router', 'ui.bootstrap', 'firebase', 'ngAnimate'])

	.config(['$httpProvider', '$compileProvider', ($httpProvider, $compileProvider) => {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$compileProvider.debugInfoEnabled(false);
	}])

	.run(['$timeout', '$rootScope', 'ytInitAPIs', 'ytFirebase', ($timeout, $rootScope, ytInitAPIs, ytFirebase) => {
		$rootScope.$on('$stateChangeSuccess', () => {
			window.scrollTo(0,0);
		});
		//Check API keys stored in localStorage
		ytInitAPIs.check()
		.then(() => {
			//Do Nothing
		});
		// ytFirebase().check();
		
	}]);
})();




