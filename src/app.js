angular
.module('myApp', ['ui.router', 'ui.bootstrap', 'ngAnimate'])

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

//For testing
.run(['$timeout', '$rootScope', function($timeout, $rootScope){
	
	$timeout(function(){
		// fixedAdjust();
		fixedAdjustMenu();

	}, 1000);

	function fixedAdjust(){
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
	}

	function fixedAdjustMenu(){
		var pageHeader = document.getElementById('page-header'),
		main = document.getElementById('header-wrapper'),
		header = document.getElementById('mast-header'),
		credit = document.getElementById('credit'),
		content = document.getElementById('animate-view-container'),
		menu = document.getElementById('header-menu'),
		style = window.getComputedStyle(credit),
		creditMargin = style.getPropertyValue('margin-top');
		creditMargin = creditMargin.replace('px', '');
		creditMargin = creditMargin*2;
		console.log(menu.offsetHeight); //42

		console.log(creditMargin); //56
		var headerHeight = header.offsetHeight+20+credit.offsetHeight+creditMargin,
		menuHeight = menu.offsetHeight;
		console.log(main.offsetHeight); //156
		var height = main.offsetHeight;
		document.onscroll = function(){
			if(window.scrollY > headerHeight){
				menu.style.height = menuHeight+'px';
				menu.className = 'fixed';
				console.log(menu.style.height);
			} else {
				menu.className = '';
			}
			// console.log(window.scrollY); //202
		}
	}

	$rootScope.$on('$stateChangeSuccess', function(){
		window.scrollTo(0,0);
	})
	
}])




