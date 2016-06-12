angular
.module('myApp')

.controller('MenuCtrl', ['$scope', 'ytVideoItems', MenuCtrl])

function MenuCtrl($rootScope, ytVideoItems){
	var vm = this;
	console.log("menu controller");
	vm.videoId = ytVideoItems.services.getVideoId();

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		console.log("changing states");
		console.log(toState);
		if(toState.name === 'video'){
			console.log("to video");
			$('#video-tab').show();
			vm.videoId = ytVideoItems.services.getVideoId();
		}
	});

	// $scope.$watch('ytVideoItems.isVideo', function (newVal, oldVal, scope) {
	// 	if(newVal) { 
	// 		scope.status = newVal;
	// 	}


	// });
}