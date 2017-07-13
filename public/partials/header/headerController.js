/*jshint esversion: 6 */

(function(){
	angular
	.module('myApp')

	.controller('HeaderCtrl', [ '$timeout', HeaderCtrl]);

	function HeaderCtrl($timeout){
		let vm = this;
		//For the slide-in animation of header contents
		$timeout(() => {
			vm.active = true;
		}, 100);
	}
})();