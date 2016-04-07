angular
.module('myApp')

.config(function($stateProvider, $urlRouterProvider){
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
				
			},
			'search@root': {
				templateUrl: "./partials/header/header-partials/search.html",
				controller: 'SearchCtrl',
				controllerAs: 'search'
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
	}

	$stateProvider
	.state(myRoot)
	.state(video)
	.state(playlist)
	.state(about)
})

