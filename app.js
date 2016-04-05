angular
.module('myApp', ['ui.router'])

.config(function($httpProvider, $stateProvider, $urlRouterProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
	};

	$stateProvider
	.state(myRoot)
	.state(video)
	.state(playlist)
})

// .controller('SearchCtrl', SearchCtrl)

// .controller('ItemCtrl', ItemCtrl)

// .controller('PlaylistCtrl', PlaylistCtrl)

// function SearchCtrl(ytSearchYouTube){
// 	var vm = this;
// 	vm.submit = submit;

// 	function submit(keyword){
// 		ytSearchYouTube(keyword).getResults()
// 		.then(function(response){
// 			console.log(response);
// 			vm.results = response.data.items;
// 		})
// 	}
// };

// function ItemCtrl($stateParams, ytTrustSrc){
// 	var vm = this;
// 	vm.submit = function(){
// 		alert("Submitted");
// 	};
// 	vm.trustSrc = ytTrustSrc;
// 	vm.videoId = $stateParams.videoId;
// 	vm.url = "http://www.youtube.com/embed/"+vm.videoId;
// 	vm.trustedUrl = vm.trustSrc(vm.url);
// };

// function PlaylistCtrl(ytVideoItems){
// 	var vm = this;
// 	// vm.trustSrc = ytTrustSrc;
// 	console.log(ytVideoItems);
// 	vm.items = ytVideoItems().getItems();
// };








