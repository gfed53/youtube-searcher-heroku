angular
.module('myApp')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('about')
	var myRoot = {
		name: 'root',
		url: '/',
		views: {
			'header': {
				templateUrl: './partials/header/header.html',
				controller: 'HeaderCtrl',
				controllerAs: 'header'
			},
			'content': {
				templateUrl: './partials/content/content.html'
			},
			'menu@root': {
				templateUrl: './partials/header/header-partials/menu.html',
				controller: 'MenuCtrl',
				controllerAs: 'menu'
			}
		}
	},
	video = {
		name: 'video',
		url: 'video/{videoId:.{11}}',
		parent: 'root',
		views: {
			'content@': {
				templateUrl: './partials/video/video.html'
			},
			'item@video': {
				templateUrl: './partials/video/video-partials/item.html',
				controller: 'ItemCtrl',
				controllerAs: 'video'
			}
		}
	},
	playlist = {
		name: 'playlist',
		url: 'playlist',
		parent: 'root',
		views: {
			'content@': {
				templateUrl: './partials/playlist/playlist.html',
				controller: 'PlaylistCtrl',
				controllerAs: 'playlist'
			}
		}
	},
	about = {
		name: 'about',
		url: 'about',
		parent: 'root',
		views: {
			'content@': {
				templateUrl: './partials/about/about.html'
			}
		}
	},
	search = {
		name: 'search',
		url: 'search',
		parent: 'root',
		views: {
			'content@': {
				templateUrl: './partials/search/search.html',
				controller: 'SearchCtrl',
				controllerAs: 'search'
			},
			'bar@search': {
				templateUrl: './partials/search/search-partials/bar.html'
			},
			'results@search': {
				templateUrl: './partials/search/search-partials/results.html'
			}
		}
	}

	$stateProvider
	.state(myRoot)
	.state(video)
	.state(playlist)
	.state(about)
	.state(search)
}])

