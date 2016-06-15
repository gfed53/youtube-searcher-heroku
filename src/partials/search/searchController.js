angular
.module('myApp')

.controller('SearchCtrl', ['$scope', 'ytSearchYouTube', 'ytChanSearch', 'ytChanFilter', 'ytSearchParams', 'ytResults', 'ytSearchHistory', 'ytVideoItems', 'ytToggleResults', SearchCtrl])

function SearchCtrl($scope, ytSearchYouTube, ytChanSearch, ytChanFilter, ytSearchParams, ytResults, ytSearchHistory, ytVideoItems, ytToggleResults){
	var vm = this;
	vm.initMap = initMap;
	vm.vidSubmit = vidSubmit;
	vm.setVideoId = setVideoId;
	vm.videosCollapsed = true;
	vm.channelsCollapsed = true;
	vm.chanSubmit = chanSubmit;
	vm.chanFilter = chanFilter;
	vm.chanClear = chanClear;
	vm.viewVideo = false;
	vm.filterActive = false;
	vm.toggleAdv = toggleAdv;
	vm.toggleResults = ytToggleResults().toggle;
	// vm.toggleResultsMock = toggleResults;
	// vm.toggleChanResultsMock = toggleChanResults;
	vm.clearSelection = clearSelection;
	vm.results = ytResults.getResults();
	vm.chanResults = ytResults.getChanResults();
	vm.searchAndChanFilter = searchAndChanFilter;
	vm.saveSearch = saveSearch;

	//Retrieving our saved params, if any
	vm.params = ytSearchParams.get();


	function initMap() {
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
		vm.circle.addListener("center_changed", function(){
			vm.center = vm.circle.getCenter();
			vm.lat = vm.center.lat();
			vm.lng = vm.center.lng();
			vm.radius = vm.circle.getRadius();
			vm.params.lat = JSON.stringify(vm.lat);
			vm.params.lng = JSON.stringify(vm.lng);
			vm.params.radius = JSON.stringify(vm.radius/1000);
			vm.params.location = vm.params.lat+","+vm.params.lng;
			vm.params.locationRadius = vm.params.radius+"km";
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
			// ytToggleResults().toggleBetween("#channel-results", "#btn-tog-channels", "Channels", "#video-results", "#btn-tog-videos", "Videos");
			console.log(vm.searchedKeyword);
			vm.channelsCollapsed = true;
			vm.videosCollapsed = false;
			var channelsBtn = document.getElementById("btn-channels"),
			videosBtn = document.getElementById("btn-videos");
			console.log(channelsBtn);
			console.log(videosBtn);
			channelsBtn.setAttribute("value", "Show Channels");
			videosBtn.setAttribute("value", "Hide Videos");
			//Saving our params to our service
			ytSearchParams.set(vm.params);
			//Saving the results to our service
			ytResults.setResults(vm.results);
		})
	}

	function setVideoId(videoId){
		ytVideoItems.services.setVideoId(videoId);
	}

	function chanSubmit(channel){
		vm.searchedChannel = channel;
		ytChanSearch(channel).getResults()
		.then(function(response){
			vm.chanResults = response.data.items;
			console.log(vm.chanResults);
			// ytToggleResults().toggleBetween("#video-results", "#btn-tog-videos", "Videos", "#channel-results", "#btn-tog-channels", "Channels");
			vm.channelsCollapsed = false;
			vm.videosCollapsed = true;
			var channelsBtn = document.getElementById("btn-channels"),
			videosBtn = document.getElementById("btn-videos");
			videosBtn.setAttribute("value", "Show Videos");
			channelsBtn.setAttribute("value", "Hide Channels");
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
	}

	function toggleResults(){
		console.log($("#btn-tog-videos"));
		$("#video-results").slideToggle(400, function(){
			console.log($("#video-results").css("display"));
			if($("#video-results").css("display")==="none"){
				$("#btn-tog-videos").attr("value", "Show Videos");
				console.log($("#btn-tog-videos"));
			} else {
				console.log("is this running?");
				$("#btn-tog-videos").attr("value", "Hide Videos");
			}
		});
		

	}

	function toggleChanResults(){
		$("#channel-results").slideToggle(400, function(){
			if($("#channel-results").css("display")==="none"){
				$("#btn-tog-channels").attr("value", "Show channels");
			} else {
				console.log("is this running?");
				$("#btn-tog-channels").attr("value", "Hide channels");
			}
		});
		
	}

	function clearSelection(){
		//Clears location/locationRadius params
		vm.params.lat = undefined;
		vm.params.lng = undefined;
		vm.params.radius = undefined;
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

	function saveSearch(params){
		ytSearchHistory.set(params);
	}

};