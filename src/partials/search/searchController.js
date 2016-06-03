angular
.module('myApp')

.controller('SearchCtrl', ['ytSearchYouTube', 'ytChanSearch', SearchCtrl])

function SearchCtrl(ytSearchYouTube, ytChanSearch){
	var vm = this;
	vm.vidSubmit = vidSubmit;
	vm.chanSubmit = chanSubmit;
	vm.viewVideo = false;

	function vidSubmit(keyword){
		vm.viewVideo = false;
		vm.searchedKeyword = keyword;
		ytSearchYouTube(keyword).getResults()
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
};