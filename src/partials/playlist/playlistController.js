angular
.module('myApp')

.controller('PlaylistCtrl', ['ytVideoItems', 'ytSearchHistory', 'ytSearchParams', PlaylistCtrl])

function PlaylistCtrl(ytVideoItems, ytSearchHistory, ytSearchParams){
	var vm = this;
	vm.items = ytVideoItems().getItems();
	vm.pastSearches = ytSearchHistory.get();
	vm.grab = grab;
	console.log(vm.pastSearches);

	function grab(search){
		ytSearchParams.set(search);
		alert("Search params for "+search.name+" now active.");
	}
};