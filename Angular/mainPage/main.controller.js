angular.module("jobApp").controller("MyMainController", MyMainController);

function MyMainController($http) {
    const vm = this;
    this.name = "jack";
    $http.get()
        .then(function (response) {
            
        })
}