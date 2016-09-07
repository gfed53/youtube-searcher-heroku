angular
.module('myApp')

.controller('PlaylistCtrl', ['$state', '$timeout', 'ytVideoItems', 'ytSearchHistory', 'ytSearchParams', 'ytPlaylistSort', 'ytFilters', PlaylistCtrl])

function PlaylistCtrl($state, $timeout, ytVideoItems, ytSearchHistory, ytSearchParams, ytPlaylistSort, ytFilters){
	var vm = this;
	vm.items = ytVideoItems.services.getItems();
	vm.setVideoId = setVideoId;
	vm.pastSearches = ytSearchHistory.get();
	vm.grab = grab;
	vm.clear = clear;
	vm.clearItem = clearItem;
	vm.clearAllVideos = clearAllVideos;
	vm.clearAllSearches = clearAllSearches;
	vm.videosReverse = ytPlaylistSort.videos.reverse;
	vm.videosPredicate = ytPlaylistSort.videos.predicate;
	vm.searchesReverse = ytPlaylistSort.searches.reverse;
	vm.searchesPredicate = ytPlaylistSort.searches.predicate;
	vm.videosCollapse = true;
	vm.searchesCollapse = true;
	vm.sortVideos = sortVideos;
	vm.sortSearches = sortSearches;
	vm.videoTabStatus = false;
	vm.closeAll = closeAll;
	console.log(vm.items);
	console.log(vm.pastSearches);
	vm.addedAfterVideos = addedAfterVideos;
	vm.addedBeforeVideos = addedBeforeVideos;
	vm.addedAfterSearches = addedAfterSearches;
	vm.addedBeforeSearches = addedBeforeSearches;
	vm.sampleFilterToggle = true;
	vm.sampleFilter = sampleFilter;
	vm.now = moment().format('X');
	vm.now = parseInt(vm.now);
	console.log(vm.now);
	
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
		vm.pastSearches = ytSearchHistory.clearAll();
	}

	function clearItem(item){
		var itemIndex = vm.items.indexOf(item);
		vm.items.splice(itemIndex, 1);
		ytVideoItems.services.clearItem(item.name);
	}

	function clearAllVideos(){
		vm.items = ytVideoItems.services.clearAllItems();
	}

	function setVideoId(videoId){
		ytVideoItems.services.setVideoId(videoId);
	}

	function sortVideos(predicate){
		var sortObj = ytPlaylistSort.order(vm.videosPredicate, predicate, ytPlaylistSort.videos);
		vm.videosReverse = sortObj.reverse;
		vm.videosPredicate = sortObj.predicate;
	}

	function sortSearches(predicate){
		var sortObj = ytPlaylistSort.order(vm.searchesPredicate, predicate, ytPlaylistSort.searches);
		vm.searchesReverse = sortObj.reverse;
		vm.searchesPredicate = sortObj.predicate;
	}

	function closeAll(group){
		group.forEach(function(e){
			e.state = false;
		});
	}

	function addedAfterVideos(video){
		return ytFilters().addedAfterVideos(video, vm.videoFilter);
	}

	function addedBeforeVideos(video){
		return ytFilters().addedBeforeVideos(video, vm.videoFilter);
	}

	function addedAfterSearches(search){
		return ytFilters().addedAfterSearches(search, vm.searchesFilter);
	}

	function addedBeforeSearches(search){
		return ytFilters().addedBeforeSearches(search, vm.searchesFilter);
	}

	//testing
	function sampleFilter(video){
		return (vm.sampleFilterToggle ? video.content.id : true);
	}
	//
};




