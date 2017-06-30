/*jshint esversion: 6 */

(function(){
	angular
	.module('myApp')
	.controller('StorageSettingsModalController', ['$uibModalInstance', 'ytFirebase', 'ytSettings', StorageSettingsModalController]);

	function StorageSettingsModalController($uibModalInstance, ytFirebase, ytSettings){
		// console.log('storange settings ctrl');
		let vm = this;

		//Retrieving prev warn setting
		
		vm.warnVal = ytSettings.getWarn();


		vm.ok = ok;
		vm.cancel = cancel;

		function ok(val){
			console.log(val);
			$uibModalInstance.close(val);
		}

		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
	}
})();