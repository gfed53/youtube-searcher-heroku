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
				templateUrl: "./partials/video.html",
				controller: 'MyCtrl',
				controllerAs: 'video'
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