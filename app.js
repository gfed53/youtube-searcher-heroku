angular
.module('myApp', ['ui.router'])

.config(function($httpProvider, $stateProvider, $urlRouterProvider){
	$httpProvider.defaults.useXDomain = true;

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
				templateUrl: "./partials/header/header-partials/menu.html"
			},
			'search@root': {
				templateUrl: "./partials/header/header-partials/search.html"
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
				controller: 'VideoCtrl',
				controllerAs: 'video'
			},
			'description@video': {
				templateUrl: "./partials/video/video-partials/description.html"
			},
			'comment@video': {
				templateUrl: "./partials/video/video-partials/comment.html"
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
	};

	$stateProvider
	.state(myRoot)
	.state(video)
	.state(playlist)
})

.controller('VideoCtrl', function($stateParams, $sce){
	var vm = this;
	vm.submit = function(){
		alert("Submitted");
	};
	vm.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	};
	vm.videoId = $stateParams.videoId
	vm.url = "http://www.youtube.com/embed/"+vm.videoId;
	vm.trustedUrl = vm.trustSrc(vm.url);
})

.controller('PlaylistCtrl', function($stateParams, $sce){
	var vm = this;
	vm.trustSrc = function(src) {
		return $sce.trustAsResourceUrl(src);
	};
	vm.items = [
		{
			name: "Video 1",
			id: "xZD-DAg7MgE"
		},
		{
			name: "Video 2",
			id: "KqRs_2kGZuY"
		},
		{
			name: "Video 3",
			id: "dqJRoh8MnBo"
		},
		{
			name: "Video 4",
			id: "OnoHdmbVPX4"
		}
	];
})




