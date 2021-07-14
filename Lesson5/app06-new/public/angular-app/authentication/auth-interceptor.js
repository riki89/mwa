angular.module("meanGames").factory("AuthInterceptor", AuthInterceptor);

function AuthInterceptor(){
    return {
        request: request
        // response: response,
        // repsonseError: repsonseError
    }

    function request(config){
        config.headers = config.headers || {};
        if ($window.sessionStorage.token){
            config.headers.Authorization = "Bearer "+$window.sessionStorage.token;
        }
        return config;
    }

    // function repsonse (response){
    //     if (response.status === 200 && $window.sessionStorage.token && !AuthDataFactory){}
    // }
}