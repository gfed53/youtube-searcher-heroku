angular
.module('myApp')

.controller('ItemCtrl', ['$stateParams', 'ytCurrentVideo', 'ytResults', 'ytVideoItems', 'ytTrustSrc', ItemCtrl])

function ItemCtrl($stateParams, ytCurrentVideo, ytResults, ytVideoItems, ytTrustSrc){
	var vm = this;
	vm.trustSrc = ytTrustSrc;
	vm.videoId = $stateParams.videoId;
	vm.url = 'http://www.youtube.com/embed/'+vm.videoId;
	vm.trustedUrl = vm.trustSrc(vm.url);
	vm.getVideoItem = getVideoItem;
	vm.item;

	vm.getVideoItem(vm.videoId);
	// console.log(vm.item);
	
	//In case of page refresh, we need to automatically save the videoId, or else, on state change, the video player tab will still exist with nowhere to go.
	ytVideoItems.services.setVideoId(vm.videoId);

	function getVideoItem(id){
		ytCurrentVideo(id).getVideo()
		.then(function(response){
			// console.log(response);
			vm.item = response.data.items[0];
		})
	}
};