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
	vm.toggleAdv = toggleAdv;
	vm.toggleResults = toggleResults;
	// vm.publishedAfter = vm.after+"T00:00:00Z";
	// vm.publishedBefore = vm.before+"T00:00:00Z";

	function vidSubmit(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius){
		vm.viewVideo = false;
		vm.searchedKeyword = keyword;
		ytSearchYouTube(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius).getResults()
		.then(function(response){
			vm.results = response.data.items;
			if($("#channel-results").css("display")==="block"){
					$("#channel-results").slideUp();
					$("#video-results").slideDown();
			}
		})
	}

	function chanSubmit(channel){
		vm.searchedChannel = channel;
		ytChanSearch(channel).getResults()
		.then(function(response){
			vm.chanResults = response.data.items;
			console.log(vm.chanResults);
			if($("#video-results").css("display")==="block"){
				console.log("yes!");
	    			$("#video-results").slideUp();
	    			$("#channel-results").slideDown();
	    		}
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

	function toggleAdv(){
		$("#advanced-search, #form-basic-video-search").slideToggle();
		// $("#form-basic-video-search")
	}

	function toggleResults(){
		$("#video-results").slideToggle();
		$("#channel-results").slideToggle();
		// console.log(results);
	}

};