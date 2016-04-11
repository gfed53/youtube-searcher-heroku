angular
.module('myApp')

.run(['$rootScope', 'ytToggleAutoScroll', 'ytContentResize', function($rootScope, ytToggleAutoScroll, ytContentResize){
	$rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams){
				// $rootScope.isLoading = true;
				// ytToggleAutoScroll();
				
				
			});
	$rootScope.$on('$stateChangeSuccess',
		function(){
			// $rootScope.isLoading = false;
			// ytToggleAutoScroll();
			ytContentResize().reset();
		});

}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/")
	var myRoot = {
		name: "root",
		url: "/",
		views: {
			'header': {
				templateUrl: "./partials/header/header.html"
			},
			'content': {
				templateUrl: "./partials/content/content.html"
			},
			'footer': {
				templateUrl: "./partials/footer/footer.html"
			},
			'menu@root': {
				templateUrl: "./partials/header/header-partials/menu.html",	
			 }
		}
	},
	video = {
		name: "video",
		url: "video/{videoId:.{11}}",
		parent: "root",
		views: {
			'content@': {
				templateUrl: "./partials/video/video.html"
			},
			'item@video': {
				templateUrl: "./partials/video/video-partials/item.html",
				controller: 'ItemCtrl',
				controllerAs: 'video'
			}
		}
	},
	playlist = {
		name: "playlist",
		url: "playlist",
		parent: "root",
		views: {
			'content@': {
				templateUrl: "./partials/playlist/playlist.html",
				controller: 'PlaylistCtrl',
				controllerAs: 'playlist'
			}
		}
	},
	about = {
		name: "about",
		url: "about",
		parent: "root",
		views: {
			'content@': {
				templateUrl: "./partials/about/about.html"
			}
		}
	},
	search = {
		name: "search",
		url: "search",
		parent: "root",
		views: {
			'content@': {
				templateUrl: "./partials/search/search.html",
				controller: 'SearchCtrl',
				controllerAs: 'search'
			},
			'bar@search': {
				templateUrl: "./partials/search/search-partials/bar.html"
			},
			'results@search': {
				templateUrl: "./partials/search/search-partials/results.html"
			}
		},
		
	}


		$stateProvider
		.state(myRoot)
		.state(video)
		.state(playlist)
		.state(about)
		.state(search);


	}])

