angular
.module('myApp')

.controller('SearchCtrl', ['ytSearchYouTube', 'ytChanSearch', 'ytChanFilter', 'ytSearchParams', 'ytResults', SearchCtrl])

function SearchCtrl(ytSearchYouTube, ytChanSearch, ytChanFilter, ytSearchParams, ytResults){
	var vm = this;
	vm.initMap = initMap;
	vm.vidSubmit = vidSubmit;
	vm.chanSubmit = chanSubmit;
	vm.chanFilter = chanFilter;
	vm.chanClear = chanClear;
	vm.viewVideo = false;
	vm.filterActive = false;
	vm.toggleAdv = toggleAdv;
	vm.toggleResults = toggleResults;
	vm.toggleChanResults = toggleChanResults;
	vm.clearSelection = clearSelection;
	vm.results = ytResults.getResults();
	vm.chanResults = ytResults.getChanResults();
	vm.searchAndChanFilter = searchAndChanFilter;

	//Retrieving our saved params, if any
	vm.params = ytSearchParams.get();
	// vm.keyword = vm.params.keyword;
	// vm.advKeyword = ytSearchParams.params.advKeyword;


	console.log(vm.params);



	function initMap() {
		// if(document.getElementById('map') != null)
	        vm.map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: 39, lng: -99},
	          zoom: 4
	        });


			vm.circle = new google.maps.Circle({
				center: {lat: 39, lng: -99},
				radius: 100000,
				editable: true,
				draggable: true
			});

			vm.circle.setMap(vm.map);
	        // console.log(vm.map);
	        // console.log(vm.circle);
	        vm.circle.addListener("center_changed", function(){
	        	vm.center = vm.circle.getCenter();
	        	vm.lat = vm.center.lat();

	        	// console.log(typeof vm.lat);
	        	vm.lng = vm.center.lng();
	        	vm.radius = vm.circle.getRadius();
	        	vm.lat = JSON.stringify(vm.lat);
	        	vm.lng = JSON.stringify(vm.lng);
	        	vm.radius = JSON.stringify(vm.radius/1000);
	        	vm.params.location = vm.lat+","+vm.lng;
				vm.params.locationRadius = vm.radius+"km";
	        	// console.log(vm.lng);
	        	// console.log(vm.lat);
	        	// console.log(vm.radius);
	        	// console.log(vm.location);
	        	// console.log(vm.locationRadius);
	        	// console.log(typeof vm.location);
	        	// console.log(typeof vm.locationRadius);
        	});
		}

	function vidSubmit(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius, pageToken){
		vm.viewVideo = false;
		vm.params.searchedKeyword = keyword;
		ytSearchYouTube(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius, pageToken).getResults()
		.then(function(response){
			vm.results = response.data.items;
			vm.params.nextPageToken = response.data.nextPageToken;
			vm.params.prevPageToken = response.data.prevPageToken;
			console.log(response);
			console.log(vm.results.nextPageToken);
			console.log(vm.params.nextPageToken);
			console.log(vm.params.prevPageToken);

			if($("#channel-results").css("display")==="block"){
					$("#channel-results").slideUp();
					$("#video-results").slideDown();
			}

			console.log(vm.searchedKeyword);

			//Saving our params to our service
			ytSearchParams.set(vm.params);
			//Saving the results to our service
			ytResults.setResults(vm.results);
		})
	}

	function chanSubmit(channel){
		vm.searchedChannel = channel;
		ytChanSearch(channel).getResults()
		.then(function(response){
			vm.chanResults = response.data.items;
			console.log(vm.chanResults);
			if($("#video-results").css("display")==="block"){
	    			$("#video-results").slideUp();
	    			$("#channel-results").slideDown();
	    		}
	    	ytResults.setChanResults(vm.chanResults);
		})
	}

	function chanFilter(id, image){
		ytChanFilter.set(id, image);
		vm.params.image = image;
		vm.params.channelId = id;
		vm.filterActive = true;
		console.log(ytChanFilter.image);
	}

	function chanClear(){
		ytChanFilter.clear();
		vm.params.image = "";
		vm.params.channelId = undefined;
		vm.filterActive = false;
	}

	function toggleAdv(){
		$("#advanced-search, #form-basic-video-search").slideToggle();
		vm.initMap();
		// $("#form-basic-video-search")
	}

	function toggleResults(){
		$("#video-results").slideToggle();
		// console.log(results);
	}

	function toggleChanResults(){
		$("#channel-results").slideToggle();
	}

	function clearSelection(){
		//Clears location/locationRadius params
		vm.lat = undefined;
		vm.lng = undefined;
		vm.radius = undefined;
		vm.params.location = undefined;
		vm.params.locationRadius = undefined;
	}

	function searchAndChanFilter(channel){
		vm.searchedChannel = channel;
		ytChanSearch(channel).getResults()
		.then(function(response){
			vm.firstChanResult = response.data.items[0];
			console.log(vm.firstChanResult);
			vm.chanFilter(vm.firstChanResult.id.channelId, vm.firstChanResult.snippet.thumbnails.default.url);
			
		})
	}

	// function setSavedParams(){

	// }

};