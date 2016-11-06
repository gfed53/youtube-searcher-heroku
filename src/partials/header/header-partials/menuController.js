angular
.module('myApp')

.controller('MenuCtrl', ['$scope', '$rootScope', '$timeout', 'ytVideoItems', 'ytFixedHeader', 'ytCheckScrollY', 'ytDropdown', MenuCtrl])

function MenuCtrl($scope, $rootScope, $timeout, ytVideoItems, ytFixedHeader, ytCheckScrollY, ytDropdown){
	var vm = this;
	vm.videoId = ytVideoItems.services.getVideoId();
	vm.videoActive = false;
	vm.showFixed = false;
	vm.update = update;
	vm.noScroll = true;

	// ytFixedHeader().init(show,hide);
	ytCheckScrollY().init(vm.update);

	function update(bool){
		$scope.$apply(function(){
			vm.noScroll = bool;
		});		
	}

	function show(){
		$scope.$apply(function(){
			vm.showFixed = true;
		});
	}

	function hide(){
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