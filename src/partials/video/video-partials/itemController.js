angular
.module('myApp')

.controller('ItemCtrl', ['$stateParams', 'ytVideoItems', 'ytTrustSrc', ItemCtrl])

function ItemCtrl($stateParams, ytVideoItems, ytTrustSrc){
	var vm = this;
	vm.trustSrc = ytTrustSrc;
	vm.videoId = $stateParams.videoId;
	vm.url = "http://www.youtube.com/embed/"+vm.videoId;
	vm.trustedUrl = vm.trustSrc(vm.url);
};