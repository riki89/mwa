angular.module("assoApp", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access: { restricted: false }
    }).when("/members", {
        templateUrl: "angular-app/member-list/member-list.html",
        controller: "MembersController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/members/:memberId", {
        templateUrl: "angular-app/member-display/member.html",
        controller: "MemberController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/members/:memberId/contributions", {
        templateUrl: "angular-app/contribution-list/contribution-list.html",
        controller: "ContributionsController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/members/:id/contributions/:contributionId", {
        templateUrl: "angular-app/contribution-display/contribution.html",
        controller: "contributionController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller: "RegisterConstroller",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/profile", {
        templateUrl: "angular-app/profile/profile.html",
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