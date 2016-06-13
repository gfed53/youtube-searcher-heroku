angular
.module('myApp')
.factory('ytTrustSrc', ['$sce', ytTrustSrc])
.factory('ytSearchYouTube', ['$q', '$http', ytSearchYouTube])
.factory('ytChanSearch', ['$q', '$http', ytChanSearch])
.service('ytChanFilter', [ytChanFilter])
.service('ytSearchParams', [ytSearchParams])
.service('ytResults', [ytResults])
.service('ytVideoItems', [ytVideoItems])
.service('ytSearchHistory', ['ytSearchParams', ytSearchHistory])

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
	this.set = set;
	this.clear = clear;

	function set(id, image){
		this.id = id;
		this.image = image;
	}

	function clear(){
		this.id = "";
		this.image = "";
	}

}

function ytVideoItems(){
	var currentVideoId;
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

	this.services = {
		getItems: getItems,
		addItem: addItem,
		getVideoId: getVideoId,
		setVideoId: setVideoId
	};

	function getItems(){
		return items;
	}

	function addItem(name, id){
		var item = {
			name: name,
			id: id
		}

		items.push(item);
	}

	function getVideoId(){
		return currentVideoId;
	}

	function setVideoId(videoId){
		currentVideoId = videoId;
	}
};

function ytSearchParams(){
	var params = {
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
		lat: undefined,
		lng: undefined,
		radius: undefined,
		prevPageToken: undefined,
		nextPageToken: undefined,
		name: undefined,
		date: undefined
	};

	this.get = get;
	this.set = set;

	function get(){
		return params;
	}

	function set(newParams){
		for(var item in params){
			params[item] = newParams[item];
		}
		console.log(params.after);
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

function ytSearchHistory(ytSearchParams){
	this.pastSearches = [];
	this.get = get;
	this.set = set;
	this.clearItem = clearItem;
	this.clearAll = clearAll;

	function get(){
		console.log(localStorage);
		if(localStorage.length > 0){
			for(key in localStorage){
				console.log(key);
				console.log(localStorage[key]);
				var obj = localStorage.getItem(key);
				obj = JSON.parse(obj);
				if(obj.name){
					if(obj.after != null){
					obj.after = new Date(obj.after);
					}
					if(obj.before != null){
						obj.before = new Date(obj.before);
					}
					console.log(obj.after);
					console.log(obj);
					//This is here to avoid existent objects getting reappended to the array within the session when they shouldn't be
					if(getIndexIfObjWithAttr(this.pastSearches, "name", obj.name) === -1){
						this.pastSearches.push(obj);
					}
				}				
			}
			return this.pastSearches;
		}
	}

	function set(params){
		console.log(params);
		params.name = prompt("Enter a name for this saved search");
		params.name = "uyts-"+params.name;
		params.date = Date.now();
		this.pastSearches.push(params);
		localStorage.setItem(params.name, JSON.stringify(params));
	}

	function clearItem(search){
		var searchIndex = this.pastSearches.indexOf(search);
		this.pastSearches.splice(searchIndex, 1);
		console.log(this.pastSearches);
		localStorage.removeItem(search.name);
	}

	function clearAll(){
		//Clears all past searches
		this.pastSearches = [];
		for(key in localStorage){
			if(key.includes("uyts")){
				localStorage.removeItem(key);
			}
		}
		console.log("should be clear now");
	}

	function getIndexIfObjWithAttr(array, attr, value) {
		for(var i = 0; i < array.length; i++) {
			if(array[i][attr] === value) {
				return i;
			}
		}
		return -1;
	}

}



