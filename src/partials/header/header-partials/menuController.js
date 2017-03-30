/*jshint esversion: 6 */

angular
.module('myApp')

.controller('MenuCtrl', ['$scope', '$rootScope', '$timeout', 'ytVideoItems', 'ytCheckScrollY', 'ytCheckScrollDir', MenuCtrl]);

function MenuCtrl($scope, $rootScope, $timeout, ytVideoItems, ytCheckScrollY, ytCheckScrollDir){
	let vm = this;
	vm.videoId = ytVideoItems.services.getVideoId();
	vm.showNav = true;
	vm.showFixed = false;
	vm.update = update;
	vm.updateOnClick = updateOnClick;
	vm.toggleNav = toggleNav;
	vm.noScroll = true;
	vm.collapsed = true;

	ytCheckScrollY().init(vm.update);

	ytCheckScrollDir().init(()=>{
		vm.showNav = true;
	}, ()=> {
		vm.showNav = false;
	});


	function update(bool){
		$scope.$apply(() => {
			vm.noScroll = bool;
		});		
	}

	//Seperate function since digest is already in progress when clicked
	function updateOnClick(){
		vm.collapsed = !vm.collapsed;
	}

	function toggleNav(){
		vm.showNav = !vm.showNav;
	}

	//Once we switch to the video state (by clicking on a video to watch), the video tab will now be visible from now on, so we have access to it for the duration of the session
	$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
		if(toState.name === 'video'){
			vm.videoId = ytVideoItems.services.getVideoId();
		}
		vm.collapsed = true;
	});
}