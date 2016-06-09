angular
.module('myApp')
.factory('ytTrustSrc', ['$sce', ytTrustSrc])
.factory('ytSearchYouTube', ['$q', '$http', ytSearchYouTube])
.factory('ytChanSearch', ['$q', '$http', ytChanSearch])
// .factory('ytToggleResults', [ytToggleResults])
.service('ytChanFilter', [ytChanFilter])
.service('ytSearchParams', [ytSearchParams])
.service('ytResults', [ytResults])
.service('ytVideoItems', [ytVideoItems])

function ytTrustSrc($sce){
	return function(src){
		return $sce.trustAsResourceUrl(src);
	}
}

function ytSearchYouTube($q, $http) {
	return function(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius, pageToken){
		    var url = "https://www.googleapis.com/youtube/v3/search";
		    var request = {
		    	key: "AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA",
		    	part: "snippet",
		    	maxResults: 50,
		    	order: order,
		    	publishedAfter: publishedAfter,
		    	publishedBefore: publishedBefore,
		    	safeSearch: safeSearch,
		    	location: location,
		    	locationRadius: locationRadius,
		    	pageToken: pageToken,
		    	q: keyword,
		    	type: "video",
		    	channelId: channelId,
		    	videoEmbeddable: true,
		    };
		    var services = {
		    	getResults: getResults
		    };
		    return services;

		    function getResults(){
		    	return $http({
		    		method: 'GET',
		    		url: url,
		    		params: request
		    	})
		    	.then(function(response){
		    		var results = response;
		    		return $q.when(response);
		    	},
		    	function(response){
		    		alert('error');
		    		console.log(response);
		    	});
		    }
		}
	};

function ytChanSearch($q, $http){
	return function(channel){
		var url = "https://www.googleapis.com/youtube/v3/search";
		    var request = {
		    	key: "AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA",
		    	part: "snippet",
		    	maxResults: 50,
		    	order: "relevance",
		    	q: channel,
		    	type: "channel"
		    };
		    var services = {
		    	getResults: getResults
		    };
		    return services;

		    function getResults(){
		    	return $http({
		    		method: 'GET',
		    		url: url,
		    		params: request
		    	})
		    	.then(function(response){
		    		var results = response;
		    		return $q.when(response);
		    	},
		    	function(response){
		    		alert("Sorry, an error occured.");
		    	});
		    }
		}
	}

function ytChanFilter(){
	this.id = "";
	this.image = "";
	// this.active = false;
	this.set = set;
	// this.get = get;
	this.clear = clear;

	function set(id, image){
		this.id = id;
		this.image = image;
		console.log(this.id);
		console.log(this.image);
		// this.active = true;
	}

	function clear(){
		this.id = "";
		this.image = "";
		// this.active
	}

}

function ytVideoItems(){
	return function(){
		var items = [
		{
			name: "Video 1",
			id: "dqJRoh8MnBo"
		},
		{
			name: "Video 2",
			id: "dqJRoh8MnBo"
		},
		{
			name: "Video 3",
			id: "dqJRoh8MnBo"
		},
		{
			name: "Video 4",
			id: "dqJRoh8MnBo"
		}
		];
		var services = {
			getItems: getItems,
			addItem: addItem
		};
		return services;

		function getItems(){
			return items;
		}

		function addItem(name, id){
			var item = {
				name: name,
				id: id
			}

			items.push[item];
		}
	}
};

function ytSearchParams(){
	this.params = {
		keyword: undefined,
		advKeyword: undefined,
		searchedKeyword: undefined,
		channel: undefined,
		channelId: undefined,
		image: undefined,
		order: undefined,
		after: undefined,
		before: undefined,
		safeSearch: undefined,
		location: undefined,
		locationRadius: undefined,
		prevPageToken: undefined,
		nextPageToken: undefined
	};

	this.get = get;
	this.set = set;

	function get(){
		return this.params;
	}

	function set(keyword, advKeyword, searchedKeyword, channel, channelId, image, order, after, before, safeSearch, location, locationRadius, prevPageToken, nextPageToken){
		this.params.keyword = keyword;
		this.params.advKeyword = advKeyword;
		this.params.searchedKeyword = searchedKeyword;
		this.params.channel = channel;
		this.params.channelId = channelId;
		this.params.image = image;
		this.params.order = order;
		this.params.after = after;
		this.params.before = before;
		this.params.safeSearch = safeSearch;
		this.params.location = location;
		this.params.locationRadius = locationRadius;
		this.params.prevPageToken = prevPageToken;
		this.params.nextPageToken = nextPageToken;
	}

}

function ytResults(){
	this.results = [];
	this.chanResults = [];
	this.getResults = getResults;
	this.getChanResults = getChanResults;
	this.setResults = setResults;
	this.setChanResults = setChanResults;

	function getResults(){
		return this.results;
	}

	function getChanResults(){
		return this.chanResults;
	}

	function setResults(results){
		this.results = results;
	}

	function setChanResults(chanResults){
		this.chanResults = chanResults;
	}
}

// function ytToggleResults(){
// 	return function(){

// 	}
// }



