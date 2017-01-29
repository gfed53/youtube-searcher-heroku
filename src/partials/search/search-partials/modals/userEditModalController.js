(function(){
	angular
	.module('myApp')
	.controller('InitModalController', ['$uibModalInstance', 'ytInitAPIs', InitModalController])

	function InitModalController($uibModalInstance, ytInitAPIs){
		var vm = this;
		vm.ok = ok;
		vm.cancel = cancel;
		vm.obj = ytInitAPIs.apisObj;

		function ok(id, youtubeKey, mapsKey, translateKey){
			var obj = {
				id: id,
				youTubeKey: youTubeKey,
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