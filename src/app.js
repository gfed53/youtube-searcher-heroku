angular
.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate'])

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

//For testing
.run(['$timeout', '$rootScope', function($timeout, $rootScope){
	
	$timeout(function(){
		var pageHeader = document.getElementById('page-header');
		var main = document.getElementById('header-wrapper');
		var header = document.getElementById('mast-header');
		var content = document.getElementById('animate-view-container');
		console.log(main.offsetHeight);
		var height = main.offsetHeight;
		// var headerTopMarg = header.style.marginTop;
		// console.log(header);
		// console.log(headerTopMarg);
		pageHeader.className = 'fixed';
		pageHeader.style.height = height+20+'px';
		content.style.top = height+20+'px';
	}, 1000);

	$rootScope.$on('$stateChangeSuccess', function(){
		// console.log(main.offsetHeight);
		// var header = document.getElementById('mast-header');
		// console.log(header.offsetHeight);
	})
	
}])




