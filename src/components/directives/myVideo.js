(function(){
	angular
	.module('myApp')

	.directive('myVideo', [myVideo]);

	function myVideo(){
		return {
			restrict: 'E',
			templateUrl: './components/directives/my-video.html',
			scope: true,
			transclude: true,
			controller: MyVideoCtrl,
			controllerAs: 'myVideo',
			bindToController: true
		}
	};

	MyVideoCtrl.$inject = ['$scope', '$element'];

	function MyVideoCtrl($scope, $element) {
		var vm = this;
		vm.videoPlayer = $element.find('iframe')[0];
	};
})();