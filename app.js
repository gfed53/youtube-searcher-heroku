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
				templateUrl: "./partials/header.html"
			},
			'content': {
				templateUrl: "./partials/content.html",
				controller: 'MyCtrl',
				controllerAs: 'content'
			},
			'footer': {
				templateUrl: "./partials/footer.html"
			},
			'menu@root': {
				templateUrl: "./partials/menu.html"
			},
			'search@root': {
				templateUrl: "./partials/search.html"
			}
		}
	})
	.state('video', {
		url: "video",
		parent: "root",
		views: {
			'content@': {
				templateUrl: "./partials/video.html"
			},
			'item@video': {
				templateUrl: "./partials/item.html",
				controller: 'MyCtrl',
				controllerAs: 'content'
			},
			'description@video': {
				templateUrl: "./partials/description.html"
			},
			'comment@video': {
				templateUrl: "./partials/comment.html"
			}
			
		}
	})
	.state('playlist', {
		url: "playlist",
		parent: "root",
		views: {
			'content@': {
				templateUrl: "./partials/playlist.html",
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