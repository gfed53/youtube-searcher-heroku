angular
.module('myApp')

// .run(function(){

// })

.controller('SearchCtrl', ['ytSearchYouTube', 'ytToggleAutoScroll', SearchCtrl])

function SearchCtrl(ytSearchYouTube, ytToggleAutoScroll){
	var vm = this;
	vm.submit = submit;
	vm.viewVideo = false;
	vm.toggleVideo = toggleVideo;

	function submit(keyword){
		vm.viewVideo = false;
		vm.searchedKeyword = keyword;
		ytSearchYouTube(keyword).getResults()
		.then(function(response){
			console.log(response);
			vm.results = response.data.items;
			ytToggleAutoScroll();
		})
	}

	function toggleVideo(){
		vm.viewVideo = !vm.viewVideo;
		console.log(vm.viewVideo);
	}
};