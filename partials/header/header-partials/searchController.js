angular
.module('myApp')

.controller('SearchCtrl', SearchCtrl)

function SearchCtrl(ytSearchYouTube){
	var vm = this;
	vm.submit = submit;

	function submit(keyword){
		ytSearchYouTube(keyword).getResults()
		.then(function(response){
			console.log(response);
			vm.results = response.data.items;
		})
	}
};