angular
.module('myApp')

.directive('myVideo', ['ytContentResize', 'ytTrustSrc', myVideo]);

function myVideo(ytContentResize, ytTrustSrc){
	return {
		restrict: "E",
		templateUrl: "./components/directives/my-video.html",
		scope: true,
		transclude: true,
		controller: MyVideoCtrl,
		controllerAs: "myVideo",
		bindToController: true,
		link: linkFunc
	}
}

function linkFunc(scope, element, attrs, controller, transcludeFn){
	// scope.ytTrustSrc = ytTrustSrc;
	scope.url = attrs.src;
	scope.source = ytTrustSrc(scope.url);
	scope.url = attrs.src;
	console.log(attrs);
	console.log(attrs.src);
	console.log(scope.source);
	console.log(ytTrustSrc);
}

function MyVideoCtrl($scope, $element, $attrs, ytContentResize, ytTrustSrc) {
	var vm = this;
	// console.log($attrs);
	// console.log(ytContentResize);
	console.log($attrs.src);
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