/*jshint esversion: 6 */

(function(){
	angular
	.module('myApp')
	.controller('ItemRemovedModalController', ['$uibModalInstance', ItemRemovedModalController]);

	function ItemRemovedModalController($uibModalInstance){
		let vm = this;
		vm.ok = ok;

		function ok(){
			$uibModalInstance.close();
		}
	}
})();