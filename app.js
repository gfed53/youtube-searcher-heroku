angular
.module('myApp', ['ui.router'])

.config(function($httpProvider, $stateProvider, $urlRouterProvider){
	$httpProvider.defaults.useXDomain = true;

	$urlRouterProvider.otherwise("/")

	$stateProvider
	.state('root', {
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
				templateUrl: "./partials/header/header-partials/menu.html"
			},
			'search@root': {
				templateUrl: "./partials/header/header-partials/search.html"
			}
		}
	})
	.state('video', {
		url: "video",
		parent: "root",
		views: {
			'content@': {
				templateUrl: "./partials/video/video.html"
			},
			'item@video': {
				templateUrl: "./partials/video/video-partials/item.html",
				controller: 'MyCtrl',
				controllerAs: 'content'
			},
			'description@video': {
				templateUrl: "./partials/video/video-partials/description.html"
			},
			'comment@video': {
				templateUrl: "./partials/video/video-partials/comment.html"
			}
			
		}
	})
	.state('playlist', {
		url: "playlist",
		parent: "root",
		views: {
			'content@': {
				templateUrl: "./partials/playlist/playlist.html",
				controller: 'MyCtrl',
				controllerAs: 'content'
			}
		}
	})
})

.controller('MyCtrl', function($sce){
	var vm = this;
	vm.submit = function(){
		alert("Submitted");
	};
	vm.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	};
})