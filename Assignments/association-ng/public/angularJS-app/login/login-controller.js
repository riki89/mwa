angular.module("assoApp").controller("LoginController", LoginController);

function LoginController(UsersDataFactory, AuthFactory, $window, jwtHelper, $location){
    const vm = this;
    vm.loggedUser = "";
    vm.isLoggedIn = function(){
        return AuthFactory.auth;
    };
    vm.login = function(){
        if (vm.username && vm.password){
            const user = {
                username: vm.username,
                password: vm.password
            };
            UsersDataFactory.login(user).then(function(result){
                console.log("login OK...",result);
                $window.sessionStorage.token = result.token;
                AuthFactory.auth = true;
                const token = $window.sessionStorage.token;
                const decodedToken = jwtHelper.decodeToken(token);
                vm.loggedinUser = decodedToken.name;
                vm.username = "";
                vm.password = "";
            }).catch(function(error){
                console.log(error);
                AuthFactory.auth = false;
                
            })
        }
    }
    vm.logout = function(){
        AuthFactory.auth = false;
        delete $window.sessionStorage.token;
        $location.path("/");
    };

    vm.isActive = function(url){
        const currentPath = $location.path().split("/")[1];
        console.log(currentPath);
        return (url === currentPath ? "active":"");
    }
}
