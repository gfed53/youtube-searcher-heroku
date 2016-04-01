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
				templateUrl: "./partials/content.html"
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
		url: "/video",
		parent: "root",
		views: {
			'search': {
				templateUrl: "./partials/search.html"
			},
			'video': {
				templateUrl: "./partials/video.html",
				controller: 'MyCtrl',
				controllerAs: 'video'
			}
		}
	})
	.state('playlist', {
		url: '/state2',
		views: {
			'search': {
				templateUrl: "./partials/search.html"
			},
			'playlist': {
				templateUrl: "./partials/playlist.html",
				controller: 'MyCtrl',
				controllerAs: 'playlist'
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