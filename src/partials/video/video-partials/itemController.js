(function(){
	angular
	.module('myApp')

	.controller('ItemCtrl', ['$state', '$stateParams', 'ytCurrentVideo', 'ytCurrentChannel', 'ytResults', 'ytVideoItems', 'ytSearchParams', 'ytTrustSrc', ItemCtrl])

	function ItemCtrl($state, $stateParams, ytCurrentVideo, ytCurrentChannel, ytResults, ytVideoItems, ytSearchParams, ytTrustSrc){
		var vm = this;
		vm.trustSrc = ytTrustSrc;
		vm.videoId = $stateParams.videoId;
		vm.url = 'http://www.youtube.com/embed/'+vm.videoId;
		vm.trustedUrl = vm.trustSrc(vm.url);
		vm.getVideoItem = getVideoItem;
		vm.clearItem = clearItem;
		vm.getChannel = getChannel;
		vm.item;
		vm.params = ytSearchParams.get();

		vm.getVideoItem(vm.videoId);
		
		
		
		//In case of page refresh, we need to automatically save the videoId, or else, on state change, the video player tab will still exist with nowhere to go.
		ytVideoItems.services.setVideoId(vm.videoId);

		//We retrieve the video from the API in order to get  
		function getVideoItem(id){
			ytCurrentVideo(id).getVideo()
			.then(function(response){
				vm.item = response.data.items[0];
				console.log(vm.item);
				vm.isSaved = ytVideoItems.services.isSaved(vm.item.id);
				console.log(vm.isSaved);
				// ytVideoItems.services.isSaved(vm.item.id);
			});
		}

		//Removes selected video item from history/localStorage (permanently)
		function clearItem(item){
			ytVideoItems.services.clearItem(undefined, item);
		}

		function getChannel(videoId){
			ytCurrentChannel(videoId).getChannel()
			.then(function(response){
				vm.channel = response.data.items[0];
				vm.params.channelId = vm.channel.id;
				vm.params.image = vm.channel.snippet.thumbnails.default.url;
				ytSearchParams.set(vm.params);
				ytSearchParams.setToAdvanced();
				$state.go('search');
			})
		}
	};
})();