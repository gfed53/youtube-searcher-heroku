(function(){
	angular
	.module('myApp')
	.controller('InitModalController', ['$uibModalInstance', InitModalController])

	function InitModalController($uibModalInstance){
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