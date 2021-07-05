angular.module("assoApp").directive("memberRating", MemberRating);

function MemberRating(){
    return {
        restrict: "E",
        templateUrl: "angular-app/member-rating/rating.html",
        bindToController:true,
        controller: "MemberController",
        controllerAs: "vm",
        // scope: {
        //     newStars: "=stars" //@
        // }
    }
}