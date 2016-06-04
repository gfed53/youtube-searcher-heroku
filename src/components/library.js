angular
.module('myApp')
.factory('ytTrustSrc', ['$sce', ytTrustSrc])
.factory('ytVideoItems', [ytVideoItems])
.factory('ytSearchYouTube', ['$q', '$http', ytSearchYouTube])
.factory('ytChanSearch', ['$q', '$http', ytChanSearch])
.factory('ytToggleResults', ytToggleResults)
.service('ytChanFilter', [ytChanFilter])

function ytTrustSrc($sce){
	return function(src){
		return $sce.trustAsResourceUrl(src);
	}
}

function ytSearchYouTube($q, $http) {
	return function(keyword, channelId, order, publishedAfter, publishedBefore, safeSearch, location, locationRadius){
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
		    		alert('error');
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

function ytToggleResults(){
	return function(){

	}
}



