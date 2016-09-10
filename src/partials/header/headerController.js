(function(){
	angular
	.module('myApp')

	.controller('HeaderCtrl', [ '$timeout', HeaderCtrl])

	function HeaderCtrl($timeout){
		var vm = this;
		$timeout(function(){
			vm.active = true;
		}, 100)
	};
})();