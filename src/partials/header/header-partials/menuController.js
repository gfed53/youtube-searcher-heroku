angular
.module('myApp')

.controller('MenuCtrl', ['$scope', '$rootScope', '$timeout', 'ytVideoItems', 'ytCheckScrollY', MenuCtrl])

function MenuCtrl($scope, $rootScope, $timeout, ytVideoItems, ytCheckScrollY){
	var vm = this;
	vm.videoId = ytVideoItems.services.getVideoId();
	vm.showFixed = false;
	vm.update = update;
	vm.updateOnClick = updateOnClick;
	vm.noScroll = true;
	vm.collapsed = true;

	ytCheckScrollY().init(vm.update);


	function update(bool){
		$scope.$apply(function(){
			vm.noScroll = bool;
		});		
	}

	//Seperate function since digest is already in progress when clicked
	function updateOnClick(){
		vm.collapsed = !vm.collapsed;
	}

	//Once we switch to the video state (by clicking on a video to watch), the video tab will now be visible from now on, so we have access to it for the duration of the session
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if(toState.name === 'video'){
			vm.videoId = ytVideoItems.services.getVideoId();
		}
		vm.collapsed = true;
	});
}