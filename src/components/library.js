angular
.module('myApp')
.factory('ytTrustSrc', ['$sce', ytTrustSrc])
.factory('ytVideoItems', [ytVideoItems])
.factory('ytSearchYouTube', ['$q', '$http', ytSearchYouTube])
.factory('ytContentResize', ytContentResize)

function ytTrustSrc($sce){
	return function(src){
		return $sce.trustAsResourceUrl(src);
	}
}

function ytSearchYouTube($q, $http) {
	return function(keyword){
		    // $scope.keyword = keyword;  
		    var url = "https://www.googleapis.com/youtube/v3/search";
		    var request = {
		    	key: "AIzaSyDKNIGyWP6_5Wm9n_qksK6kLSUGY_kSAkA",
		    	part: "snippet",
		    	maxResults: 50,
		    	order: "relevance",
		    	q: keyword,
		    	type: "video",
		    	videoEmbeddable: true,
		    };
		    var services = {
		    	getResults: getResults
		    };
		    console.log("searching: "+keyword);
		    return services;

		    function getResults(){
		    	console.log("is working");
		    	return $http({
		    		method: 'GET',
		    		url: url,
		    		params: request
		    	})
		    	.then(function(response){
		    		console.log("working");
		    		console.log(response);
		    		var results = response;
		    		// return results;
		    		return $q.when(response);
		    	},
		    	function(response){
		    		alert('error');
		    	});
		    }
		}
	};

	function ytVideoItems(){
		return function(){
			var items = [
			{
				name: "Video 1",
				id: "xZD-DAg7MgE"
			},
			{
				name: "Video 2",
				id: "KqRs_2kGZuY"
			},
			{
				name: "Video 3",
				id: "dqJRoh8MnBo"
			},
			{
				name: "Video 4",
				id: "OnoHdmbVPX4"
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

	function ytContentResize(){
	return function(){
		var services = {
			set: set
		},
		size = "",
		container = document.getElementById("animate-view-container");

		return services;

		function set(newSize){
			size = newSize;
			if(size==="large"){
				container.style.height = "500px";
			} else {
				container.style.height = "400px";
			}
			console.log(size);
		}
	}
}




