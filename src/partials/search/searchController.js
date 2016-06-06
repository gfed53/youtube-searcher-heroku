angular
.module('myApp')

.controller('SearchCtrl', ['ytSearchYouTube', 'ytChanSearch', 'ytChanFilter', SearchCtrl])

function SearchCtrl(ytSearchYouTube, ytChanSearch, ytChanFilter){
	var vm = this;
	vm.initMap = initMap;
	vm.vidSubmit = vidSubmit;
	vm.chanSubmit = chanSubmit;
	vm.chanFilter = chanFilter;
	vm.chanClear = chanClear;
	// vm.ytChanFilter = ytChanFilter;
	vm.viewVideo = false;
	vm.filterActive = false;
	vm.toggleAdv = toggleAdv;
	vm.toggleResults = toggleResults;
	vm.clearSelection = clearSelection;
	// vm.location = "("+vm.lat+","+vm.lng+")";
	// vm.locationRadius = vm.radius + "m";

	// google.maps.event.addDomListener(window, "load", vm.initMap);

	// vm.initMap();
	// vm.publishedAfter = vm.after+"T00:00:00Z";
	// vm.publishedBefore = vm.before+"T00:00:00Z";

	function initMap() {
		// if(document.getElementById('map') != null)
	        vm.map = new google.maps.Map(document.getElementById('map'), {
	          center: {lat: 39, lng: -99},
	          zoom: 4
	          	// center: {lat: 40, lng: -73},
	          	// zoom: 8
	        });


			vm.circle = new google.maps.Circle({
				center: {lat: 39, lng: -99},
				radius: 100000,
				editable: true,
				draggable: true
			});

			vm.circle.setMap(vm.map);
	        console.log(vm.map);
	        console.log(vm.circle);
	        vm.circle.addListener("center_changed", function(){
	        	vm.center = vm.circle.getCenter();
	        	vm.lat = vm.center.lat();

	        	console.log(typeof vm.lat);
	        	vm.lng = vm.center.lng();
	        	vm.radius = vm.circle.getRadius();
	        	vm.lat = JSON.stringify(vm.lat);
	        	vm.lng = JSON.stringify(vm.lng);
	        	vm.radius = JSON.stringify(vm.radius/1000);
	        	vm.location = vm.lat+","+vm.lng;
				vm.locationRadius = vm.radius+"km";
	        	console.log(vm.lng);
	        	console.log(vm.lat);
	        	console.log(vm.radius);
	        	console.log(vm.location);
	        	console.log(vm.locationRadius);
	        	console.log(typeof vm.location);
	        	console.log(typeof vm.locationRadius);
        	});
		}

	function vidSubmit(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius, pageToken){
		vm.viewVideo = false;
		vm.searchedKeyword = keyword;
		ytSearchYouTube(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius, pageToken).getResults()
		.then(function(response){
			vm.results = response.data.items;
			vm.nextPageToken = response.data.nextPageToken;
			console.log(response);
			console.log(vm.results.nextPage)
			if($("#channel-results").css("display")==="block"){
					$("#channel-results").slideUp();
					$("#video-results").slideDown();
			}
			// window.scrollTo();
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
		vm.initMap();
		// $("#form-basic-video-search")
	}

	function toggleResults(){
		$("#video-results").slideToggle();
		$("#channel-results").slideToggle();
		// console.log(results);
	}

	function clearSelection(){
		//Clears location/locationRadius params
		vm.location = undefined;
		vm.locationRadius = undefined;
	}

};