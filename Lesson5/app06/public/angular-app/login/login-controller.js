angular.module("meanGames").controller("LoginController", LoginController);

function LoginController(UsersDataFactory, AuthDataFactory, $window, jwtHelper, $location){
    const vm = this;
    vm.loggedUser = "";
    vm.isLoggedIn = function(){
        return AuthDataFactory.auth;
    };
    vm.login = function(){
        if (vm.username && vm.password){
            const user = {
                username: vm.username,
                password: vm.password
            };
            UsersDataFactory.login().then(function(result){
                console.log(result);
                $window.sessionStorage.token = result.token;
                AuthDataFactory.auth = true;
                const decodedToken = jwtHelper.decodeToken(token);
                vm.loggedUser = decodedToken.name;
                vm.username = "";
                vm.password = "";
            }).catch(function(error){
                console.log(error);
                AuthDataFactory.auth = false;
                
            })
        }
    }
    vm.logout = function(){
        AuthDataFactory.auth = false;
        delete $window.sessionStorage.token;
        $location.psth("/");
    };

    vm.isActive = function(url){
        const currentPath = $location.path().split("/")[1];
        console.log(currentPath);
        return (url === currentPath ? "active":"");
    }
}
