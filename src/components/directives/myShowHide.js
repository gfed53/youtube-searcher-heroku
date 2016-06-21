//A directive that toggles the text of a button on click. Not currently used, but held onto.
angular
.module('myApp')

.directive('myShowHide', [myShowHide]);

function myShowHide(){
    return {
        restrict: 'A',
        templateUrl: './components/directives/my-show-hide.html',
        scope: true,
        transclude: true,
        link: function (scope, elem, attrs) {
            elem.bind("click", function () {
                console.log(attrs);
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