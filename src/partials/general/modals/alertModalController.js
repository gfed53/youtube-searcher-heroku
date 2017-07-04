/*jshint esversion: 6 */

(function(){
	angular
	.module('myApp')
	.controller('AlertModalController', ['$uibModalInstance', AlertModalController]);

	function AlertModalController($uibModalInstance){
		let vm = this;
		vm.ok = ok;
		vm.cancel = cancel;

		function ok(){
			$uibModalInstance.close();
		}

		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
	}
})();