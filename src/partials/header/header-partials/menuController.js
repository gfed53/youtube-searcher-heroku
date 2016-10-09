angular
.module('myApp')

.controller('MenuCtrl', ['$scope', '$rootScope', 'ytVideoItems', 'ytFixedHeader', MenuCtrl])

function MenuCtrl($scope, $rootScope, ytVideoItems, ytFixedHeader){
	var vm = this;
	vm.videoId = ytVideoItems.services.getVideoId();
	vm.videoActive = false;
	vm.showFixed = false;

	ytFixedHeader().altAdjust(show,hide);

	function show(){
		// console.log('should show CB');
		$scope.$apply(function(){
			vm.showFixed = true;
		});
	}

	function hide(){
		// console.log('should hide CB');
		$scope.$apply(function(){
			vm.showFixed = false;
		});
	}

	//Once we switch to the video state (by clicking on a video to watch), the video tab will now be visible from now on, so we have access to it for the duration of the session
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if(toState.name === 'video'){
			vm.videoActive = true;
			vm.videoId = ytVideoItems.services.getVideoId();
		}
	});
}