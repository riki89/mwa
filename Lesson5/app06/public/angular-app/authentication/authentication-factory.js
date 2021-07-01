angular.module("meanGames").factory("AuthDataFactory", AuthDataFactory);

function AuthDataFactory(){
    return {
        auth: auth
    };
    let auth = false;
    
}
