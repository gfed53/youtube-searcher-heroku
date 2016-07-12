angular
.module('myApp')

.controller('PlaylistCtrl', ['$state', '$timeout', 'ytVideoItems', 'ytSearchHistory', 'ytSearchParams', PlaylistCtrl])

function PlaylistCtrl($state, $timeout, ytVideoItems, ytSearchHistory, ytSearchParams){
	var vm = this;
	vm.items = ytVideoItems.services.getItems();
	vm.setVideoId = setVideoId;
	vm.pastSearches = ytSearchHistory.get();
	vm.grab = grab;
	vm.clear = clear;
	vm.clearItem = clearItem;
	vm.clearAll = clearAll;

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

	function clearAll(){
		vm.pastSearches = [];
		ytSearchHistory.clearAll();
	}

	function clearItem(item){
		var itemIndex = vm.items.indexOf(item);
		vm.items.splice(itemIndex, 1);
		ytVideoItems.services.clearItem(item.name);
	}

	function setVideoId(videoId){
		ytVideoItems.services.setVideoId(videoId);
	}
};