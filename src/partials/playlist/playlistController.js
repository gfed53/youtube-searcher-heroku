angular
.module('myApp')

.controller('PlaylistCtrl', ['ytVideoItems', PlaylistCtrl])

function PlaylistCtrl(ytVideoItems){
	var vm = this;
	vm.items = ytVideoItems().getItems();
};