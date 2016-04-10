angular
.module('myApp', ['ui.router', 'ngAnimate'])

// .run(function(){
// 	var element = document.getElementById('results');
// 	if(element != null){
// 		document.getElementById('content').setAttribute("autoscroll", "");
// 	}
// })

.config(['$httpProvider', function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])








