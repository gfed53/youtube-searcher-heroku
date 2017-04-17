/*jshint esversion: 6 */

(function(){
	angular
	.module('myApp')
	.controller('InitFirebaseModalController', ['$uibModalInstance', InitFirebaseModalController]);

	function InitFirebaseModalController($uibModalInstance){
		let vm = this;
		vm.ok = ok;
		vm.cancel = cancel;

		function ok(obj){
			$uibModalInstance.close(obj);
		}

		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
	}
})();