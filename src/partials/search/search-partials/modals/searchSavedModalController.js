(function(){
	angular
	.module('myApp')
	.controller('SearchSavedModalController', ['$uibModalInstance', SearchSavedModalController])

	function SearchSavedModalController($uibModalInstance){
		var vm = this;
		// vm.savedSearch;
		vm.ok = ok;
		vm.cancel = cancel;

		function ok(){
			$uibModalInstance.close(vm.savedSearch);
		}

		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
	}

	// function SearchSavedInstanceContoller($uibModalInstance){
	// 	var vm = this;
	// }
})();