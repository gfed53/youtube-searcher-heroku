angular
.module('myApp')

.controller('MenuCtrl', ['$scope', 'ytVideoItems', MenuCtrl])

function MenuCtrl($rootScope, ytVideoItems){
	var vm = this;
	vm.videoId = ytVideoItems.services.getVideoId();

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if(toState.name === 'video'){
			$('#video-tab').show();
			vm.videoId = ytVideoItems.services.getVideoId();
			console.log(vm.videoId);
		}
	});
}