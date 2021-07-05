angular.module("assoApp").controller("RegisterController", RegisterController);
function RegisterController() {
    var vm = this;
    vm.register = function ($http) {
        var user = { 
            username: vm.username,
            pasword: vm.password 
        };
        if (!vm.username || !vm.password) { 
            vm.err = "Please add a username and password."; 
        }
        else {
            if (vm.password !== vm.passwordRepeate) {
                vm.err = "Please make sure the passwords match.";
            } else {
                $http.post("/api/users/register", user).then(function (result) {
                    console.log(result);
                    vm.message = "Successful registration, please login.";
                    vm.err = "";
                }).catch(function (err) { console.log(err); });
            }
        }
    }
};