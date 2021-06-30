angular.module("assoApp", ['ngRoute']).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angular-app/member-list/member-list.html",
        controller:"MembersController",
        controllerAs: "vm"
    }).when("/members/:memberId", {
        templateUrl: "angular-app/member-display/member.html",
        controller:"MemberController",
        controllerAs: "vm"
    }).when("/members/:memberId/contributions", {
        templateUrl: "angular-app/contribution-list/contribution-list.html",
        controller:"ContributionsController",
        controllerAs: "vm"
    }).when("/members/:id/contributions/:contributionId", {
        templateUrl: "angular-app/contribution-display/contribution.html",
        controller:"contributionController",
        controllerAs: "vm"
    })
}