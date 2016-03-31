angular
.module('myApp', ['ui.router'])

.config(function($httpProvider, $stateProvider, $urlRouterProvider){
	$httpProvider.defaults.useXDomain = true;

	$urlRouterProvider.otherwise("/")

	$stateProvider
	.state('state1', {
		url: "/state1",
		views: {
			'search': {
				templateUrl: "./partials/search.html"
			},
			'video': {
				templateUrl: "./partials/video.html"
			}
		}
	})
	.state('state2', {
		url: '/state2',
		views: {
			'search': {
				templateUrl: "./partials/search.html"
			},
			'playlist': {
				templateUrl: "./partials/playlist.html"
			}
		}
	})
})