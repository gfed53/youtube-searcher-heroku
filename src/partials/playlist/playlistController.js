angular
.module('myApp')

.controller('PlaylistCtrl', ['ytVideoItems', 'ytSearchHistory', 'ytSearchParams', PlaylistCtrl])

function PlaylistCtrl(ytVideoItems, ytSearchHistory, ytSearchParams){
	var vm = this;
	vm.items = ytVideoItems.services.getItems();
	// vm.items = [];
	vm.setVideoId = setVideoId;
	vm.pastSearches = ytSearchHistory.get();
	vm.grab = grab;
	vm.clear = clear;
	vm.clearItem = clearItem;
	vm.clearAll = clearAll;
	console.log(vm.pastSearches);
	// ytVideoItems.services.clearAllItems();

	function grab(search){
		ytSearchParams.set(search);
		alert("Search params for "+search.name+" now active.");
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