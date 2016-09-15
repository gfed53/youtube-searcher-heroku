angular
.module('myApp')

.controller('MenuCtrl', ['$scope', 'ytVideoItems', MenuCtrl])

function MenuCtrl($rootScope, ytVideoItems){
	var vm = this;
	vm.videoId = ytVideoItems.services.getVideoId();

	//Once we switch to the video state (by clicking on a video to watch), the video tab will now be visible from now on, so we have access to it for the duration of the session
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if(toState.name === 'video'){
			//TODO: Replace jQuery with Ang
			$('#video-tab').show();
			vm.videoId = ytVideoItems.services.getVideoId();
		}
	});
}