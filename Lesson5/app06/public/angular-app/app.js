angular.module("meanGames", ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($routeProvider){
    %httpProvider.interceptors.push("AuthInterceptor");
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome.html",
        access: {restricted: false}
    }).when("/games", {
        templateUrl: "angular-app/game-list/game-list.html",
        controller:"GamesController",
        controllerAs: "vm",
        access: {restricted: false}
    }).when("/games/:gameId", {
        templateUrl: "angular-app/game-display/game.html",
        controller:"GameController",
        controllerAs: "vm",
        access: {restricted: false}
    }).when("/register", {
        templateUrl: "angular-app/register/register.html",
        controller:"LoginController",
        controllerAs: "vm",
        access: {restricted: false}
    }).when("/profile", {
        templateUrl: "angular-app/welcome.html",
        access: {restricted: true}
    }).otherwise({
        redirectTo: "/"
    });
}

function run($routeScope, $location, $window, AuthDataFactory){
    $routeScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute){
        if (currentRoute.access !== undefined 
            && nextRoute.access.restricted
            && !$window.sessionStorage.token
            && !AuthDataFactory.auth) // check if you may access the next route
        //if you are not allowed to access 
        event.preventDefault(); //Do not go to the path
        $location.path("/"); //instead send back to home
    })
}