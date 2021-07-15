angular.module("meanGames").directive("gamesNavigation", GamesNavigation);

function GamesNavigation(){
    return {
        restrict: "E", //E: ELement you also have A: Attribute, C:Class, M: Comment 
        templateUrl: "angularJS-app/navigation-directive/navigation-directive.html"
    }
}