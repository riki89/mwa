angular.module("assoApp").factory("UsersDataFactory", UsersDataFactory);

function UsersDataFactory($http) {
    return {
        // getOne: getOneUser,
        login: getOneUser,
        register: addOneUser,
    }


    function getOneUser(user) {
        console.log(user);
        return $http.post("/api/users/login/", user)
            .then(complete)
            .catch(failed)
    }

    function addOneUser(user) {
        return $http.post("/api/users/", user)
            .then(complete)
            .catch(failed)
    }

    function complete(response) {
        console.log("user factory", response);
        return response.data;
    }

    function failed(error) {
        console.log("user factory error", error);
        return error.status.statusText;
    }
}