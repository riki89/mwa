angular.module("assoApp").directive("assosNavigation", AssosNavigation);

function AssosNavigation(){
    return {
        restrict: "E", //E: ELement you also have A: Attribute, C:Class, M: Comment 
        templateUrl: "angular-app/navigation-directive/navigation-directive.html"
    }
}