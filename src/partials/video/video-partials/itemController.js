angular
.module('myApp')

.controller('ItemCtrl', ['$stateParams', 'ytTrustSrc', ItemCtrl])

function ItemCtrl($stateParams, ytTrustSrc){
	var vm = this;
	vm.submit = function(){
		alert("Submitted");
	};
	vm.trustSrc = ytTrustSrc;
	vm.videoId = $stateParams.videoId;
	vm.url = "http://www.youtube.com/embed/"+vm.videoId;
	vm.trustedUrl = vm.trustSrc(vm.url);
};