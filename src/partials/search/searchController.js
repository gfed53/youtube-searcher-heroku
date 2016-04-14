angular
.module('myApp')

.controller('SearchCtrl', ['ytSearchYouTube', SearchCtrl])

function SearchCtrl(ytSearchYouTube){
	var vm = this;
	vm.submit = submit;
	vm.viewVideo = false;

	function submit(keyword){
		vm.viewVideo = false;
		vm.searchedKeyword = keyword;
		ytSearchYouTube(keyword).getResults()
		.then(function(response){
			vm.results = response.data.items;
		})
	}
};