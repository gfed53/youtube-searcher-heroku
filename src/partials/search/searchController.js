angular
.module('myApp')

.controller('SearchCtrl', ['ytSearchYouTube', 'ytChanSearch', 'ytChanFilter', SearchCtrl])

function SearchCtrl(ytSearchYouTube, ytChanSearch, ytChanFilter){
	var vm = this;
	vm.vidSubmit = vidSubmit;
	vm.chanSubmit = chanSubmit;
	vm.chanFilter = chanFilter;
	vm.chanClear = chanClear;
	// vm.ytChanFilter = ytChanFilter;
	vm.viewVideo = false;
	vm.filterActive = false;

	function vidSubmit(keyword, channelId){
		vm.viewVideo = false;
		vm.searchedKeyword = keyword;
		ytSearchYouTube(keyword, channelId).getResults()
		.then(function(response){
			vm.results = response.data.items;
		})
	}

	function chanSubmit(channel){
		vm.searchedChannel = channel;
		ytChanSearch(channel).getResults()
		.then(function(response){
			vm.chanResults = response.data.items;
			console.log(vm.chanResults);
		})
	}

	function chanFilter(id, image){
		ytChanFilter.set(id, image);
		vm.image = image;
		vm.channelId = id;
		vm.filterActive = true;
		console.log(ytChanFilter.image);
	}

	function chanClear(){
		ytChanFilter.clear();
		vm.image = "";
		vm.channelId = undefined;
		vm.filterActive = false;
	}
};