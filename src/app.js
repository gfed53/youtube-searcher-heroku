// $(function(){
// 	//Animations
// 	console.log("hi");
// 	$("h1").velocity({ translateX: [0, "-20em"] }, { duration: 800 });
// 	$("#credit").velocity({ translateX: [0, "20em"] }, {duration: 1000 });
// });

angular
.module('myApp', ['ui.router', 'ngAnimate'])

.run(function(){
	// document.addEventListener("load", function(event){
	// 	document.getElementById("mast-header").velocity({ translateX: [0, "-20em"] }, { duration: 800 });
	// 	document.getElementById("credit").velocity({ translateX: [0, "20em"] }, {duration: 1000 });
	// });
	
})

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])








