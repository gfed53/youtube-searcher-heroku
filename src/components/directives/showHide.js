angular
.module('myApp')

.directive('myShowHide', [myShowHide]);

function myShowHide(){
    return {
        restrict: 'A',
        templateUrl: './components/directives/show-hide.html',
        scope: true,
        transclude: true,
        link: function (scope, elem, attrs) {
            elem.bind("click", function () {
                console.log(attrs);
                // console.log(elem);
                console.log('startstop clicked', elem)
                if (elem.val().includes("Show")) {
                    console.log("hide");
                    elem.val(elem.val().replace("Show", "Hide"));
                } else {
                    console.log("show");
                    elem.val(elem.val().replace("Hide", "Show"));
                }
            })
        }
    }
}