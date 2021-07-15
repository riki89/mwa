angular.module("meanGames", ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($routeProvider, $httpProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider.when("/", {
        templateUrl: "angularJS-app/welcome.html",
        access: {restricted: false}
    }).when("/games", {
        templateUrl: "angularJS-app/game-list/game-list.html",
        controller:"GamesController",
        controllerAs: "vm",
        access: {restricted: false}
    }).when("/games/:gameId", {
        templateUrl: "angularJS-app/game-display/game.html",
        controller:"GameController",
        controllerAs: "vm",
        access: {restricted: false}
    }).when("/register", {
        templateUrl: "angularJS-app/register/register.html",
        controller:"LoginController",
        controllerAs: "vm",
        access: {restricted: false}
    }).when("/profile", {
        templateUrl: "angularJS-app/welcome.html",
        access: {restricted: true}
    }).otherwise({
        redirectTo: "/"
    });
}

// function run($rootScope, $location, $window, AuthFactory){
//     $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute){
//         if (currentRoute.access !== undefined 
//             && nextRoute.access.restricted
//             && !$window.sessionStorage.token
//             && !AuthFactory.auth) // check if you may access the next route
//         //if you are not allowed to access 
//         event.preventDefault(); //Do not go to the path
//         $location.path("/"); //instead send back to home
//     })
// }
function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token &&
            !AuthFactory.isLoggedIn) {
            event.preventDefault(); // Do not go to that path
            $location.path("/"); // Instead go to the root
        }
    });
}