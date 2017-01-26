(function(){
	angular
	.module('myApp')
	.controller('SearchSavedModalController', ['$uibModalInstance', SearchSavedModalController])

	function SearchSavedModalController($uibModalInstance){
		var vm = this;
		vm.ok = ok;
		vm.cancel = cancel;

		function ok(id, youtubeKey, mapsKey, translateKey){
			var obj = {
				id: id,
				youtubeKey: youtubeKey,
				mapsKey: mapsKey,
				translateKey: translateKey
			}
			$uibModalInstance.close(obj);
		}

		function cancel(){
			$uibModalInstance.dismiss('cancel');
		}
	}
})();