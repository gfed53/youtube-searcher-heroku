(function(){
	angular
	.module('myApp')

	.controller('HeaderCtrl', [ '$timeout', HeaderCtrl])

	function HeaderCtrl($timeout){
		var vm = this;
		//For the slide-in animation of header contents
		$timeout(function(){
			vm.active = true;
		}, 100)
	};
})();