angular
.module('myApp')

.directive('myVideo', [myVideo]);

function myVideo(){
	return {
		restrict: "E",
		templateUrl: "./components/directives/my-video.html",
		scope: true,
		transclude: true,
		controller: MyVideoCtrl,
		controllerAs: "myVideo",
		bindToController: true
	}
};

MyVideoCtrl.$inject = ['$scope', '$element'];


//Not currently in use
// function linkFunc(scope, element, attrs, controller, transcludeFn){

// };

function MyVideoCtrl($scope, $element) {
	var vm = this;
	vm.videoPlayer = $element.find('iframe')[0];
	vm.goSmall = function(){
		vm.videoPlayer.width = "480";
		vm.videoPlayer.height = "240";
	}
	vm.goMed = function(){
		vm.videoPlayer.width = "640";
		vm.videoPlayer.height = "390";
	}
	vm.goLarge = function(){
		vm.videoPlayer.width = "720";
		vm.videoPlayer.height = "480";
	}
};
