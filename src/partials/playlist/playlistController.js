angular
.module('myApp')

.controller('PlaylistCtrl', ['$state', '$timeout', 'ytVideoItems', 'ytSearchHistory', 'ytSearchParams', 'ytPlaylistSort', PlaylistCtrl])

function PlaylistCtrl($state, $timeout, ytVideoItems, ytSearchHistory, ytSearchParams, ytPlaylistSort){
	var vm = this;
	vm.items = ytVideoItems.services.getItems();
	vm.setVideoId = setVideoId;
	vm.pastSearches = ytSearchHistory.get();
	vm.grab = grab;
	vm.clear = clear;
	vm.clearItem = clearItem;
	vm.clearAllVideos = clearAllVideos;
	vm.clearAllSearches = clearAllSearches;
	vm.videoReverse = ytPlaylistSort.videos.reverse;
	vm.videoPredicate = ytPlaylistSort.videos.predicate;
	vm.sortVideos = sortVideos;
	console.log(vm.items);
	console.log(localStorage);

	function grab(search){
		var type = {
			basic: true,
			advanced: false
		};
		ytSearchParams.set(search);
		ytSearchParams.setSearchType(type);
		$state.go('search');
	}

	function clear(search){
		ytSearchHistory.clearItem(search);
	}

	function clearAllSearches(){
		vm.pastSearches = [];
		ytSearchHistory.clearAll();
	}

	function clearItem(item){
		var itemIndex = vm.items.indexOf(item);
		vm.items.splice(itemIndex, 1);
		ytVideoItems.services.clearItem(item.name);
	}

	function clearAllVideos(){
		vm.items = [];
		ytVideoItems.services.clearAllItems();
	}

	function setVideoId(videoId){
		ytVideoItems.services.setVideoId(videoId);
	}

	function sortVideos(predicate){
		var sortObj = ytPlaylistSort.order(vm.videoPredicate, predicate, ytPlaylistSort.videos);
		vm.videoReverse = sortObj.reverse;
		vm.videoPredicate = sortObj.predicate;
	}



};




