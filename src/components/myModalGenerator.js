//Use with Angular UI Bootstrap
//A modal-generating factory
function myModalGenerator($q, $uibModal){
	return function(){
		var services = {
			openModal: openModal
		};

		//Use this format
		var template = {
			templateUrl: 'path/to/templateURL',
			controller: 'modalController',
			controllerAs: 'modal'
		}

		function openModal(modalObj){
			var deferred = $q.defer();
			var modalInstance = $uibModal.open({
				templateUrl: modalObj.templateUrl,
				controller: modalObj.controller,
				controllerAs: modalObj.controllerAs
			});

			modalInstance.result.then(function(result){
					deferred.resolve(result);
				}, function(error){
					deferred.reject(error);
				});

				return deferred.promise;
			}

		function getTemplate(){
			return template;
		}

		return services;
	}
}