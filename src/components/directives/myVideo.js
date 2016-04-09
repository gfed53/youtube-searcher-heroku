angular
.module('myApp')

.directive('myVideo', ['ytContentResize', myVideo]);

function myVideo(ytContentResize){
	return {
		restrict: "E",
		templateUrl: "./components/directives/my-video.html",
		scope: true,
		transclude: true,
		link: linkFunc,
		controller: MyVideoCtrl,
		controllerAs: "myVideo"
	}
}

function linkFunc(scope, element, attrs){
	console.log("nothing");
}

function MyVideoCtrl($scope, $element, $attrs, ytContentResize) {
	var vm = this;
	// vm.source = $attrs.src;
	console.log($attrs);
	// console.log(ytContentResize);
	// console.log($scope.$eval($attrs.src));
	vm.videoPlayer = $element.find('iframe')[0];
	vm.goSmall = function(){
		vm.videoPlayer.width = "480";
		vm.videoPlayer.height = "240";
		ytContentResize().set("small");
	}
	vm.goMed = function(){
		vm.videoPlayer.width = "640";
		vm.videoPlayer.height = "390";
		ytContentResize().set("medium");
	}
	vm.goLarge = function(){
		vm.videoPlayer.width = "720";
		vm.videoPlayer.height = "480";
		ytContentResize().set("large");
	}

}

function goSmall(videoPlayer){
	videoPlayer.width = "480";
	videoPlayer.height = "240";
}

function goMed(videoPlayer){

}