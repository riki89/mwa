angular.module("assoApp", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/welcome/welcome.html",
        access: { restricted: false }
    }).when("/members", {
        templateUrl: "angularjs-app/member-list/member-list.html",
        controller: "MembersController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/members/:memberId", {
        templateUrl: "angularjs-app/member-display/member.html",
        controller: "MemberController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/members/:memberId/contributions", {
        templateUrl: "angularjs-app/contribution-list/contribution-list.html",
        controller: "ContributionsController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/members/:id/contributions/:contributionId", {
        templateUrl: "angularjs-app/contribution-display/contribution.html",
        controller: "contributionController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/register", {
        templateUrl: "angularjs-app/register/register.html",
        controller: "RegisterConstroller",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/profile", {
        templateUrl: "angularjs-app/profile/profile.html",
        controller: "ProfileController",
        controllerAs: "vm",
        access: { restricted: true }
    }).otherwise({
        ridrectTo: "/"
    })
}
function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token &&
            !AuthFactory.isLoggedIn) {
            event.preventDefault(); // Do not go to that path
            $location.path("/"); // Instead go to the root
        }
    });
}