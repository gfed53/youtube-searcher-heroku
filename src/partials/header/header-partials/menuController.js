angular
.module('myApp')

.controller('MenuCtrl', ['$scope', 'ytVideoItems', MenuCtrl])

function MenuCtrl($rootScope, ytVideoItems){
	var vm = this;
	vm.videoId = ytVideoItems.services.getVideoId();
	vm.videoActive = false;

	//Once we switch to the video state (by clicking on a video to watch), the video tab will now be visible from now on, so we have access to it for the duration of the session
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if(toState.name === 'video'){
			vm.videoActive = true;
			vm.videoId = ytVideoItems.services.getVideoId();
		}
	});
}