(function(){
	angular
	.module('myApp')
	.controller('DangerModalController', ['$uibModalInstance', DangerModalController])

	function DangerModalController($uibModalInstance){
		var vm = this;
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