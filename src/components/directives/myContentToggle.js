angular.module('myApp')

.directive('myContentToggle', [myContentToggle]);

function myContentToggle(){
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attr){
			console.log(elem);
			console.log(attr);
			scope.$watch(attr.myContentToggle, function(newVal, oldVal){
				if(newVal){
					// scope.$apply(function(){
						return elem.removeClass('hidden');
					// });
					
				} else {
					// scope.$apply(function(){
						return elem.addClass('hidden');
					// });
					
				}
			})
		}
	}
}