angular.module("assoApp").controller("MembersController", MembersController);

function MembersController(MembersDataFactory){
    const vm = this;
    vm.title = "Test controller";
    MembersDataFactory.getAll().then(function(response){
        vm.members = response;
    })
}