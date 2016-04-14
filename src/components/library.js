angular
.module('myApp')
.factory('ytTrustSrc', ['$sce', ytTrustSrc])
.factory('ytVideoItems', [ytVideoItems])
.factory('ytSearchYouTube', ['$q', '$http', ytSearchYouTube])

function ytTrustSrc($sce){
	return function(src){
		return $sce.trustAsResourceUrl(src);
	}
}

function ytSearchYouTube($q, $http) {
	return function(keyword){
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



