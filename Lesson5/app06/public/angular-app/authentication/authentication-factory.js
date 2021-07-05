angular.module("meanGames").factory("AuthFactory", AuthFactory);

function AuthFactory(){
    return {
        auth: auth
    };
    let auth = false;
    
}
