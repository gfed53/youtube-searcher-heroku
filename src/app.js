angular
.module('myApp', ['ui.router', 'ngAnimate'])

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.run(function(){
	// var map;
	// initMap();
	// function initMap() {
	// 	console.log("working?");
	//         map = new google.maps.Map(document.getElementById('map'), {
	//           center: {lat: 39, lng: -99},
	//           zoom: 2
	//           	// center: {lat: 40, lng: -73},
	//           	// zoom: 8
	//         });
	//     };
})




