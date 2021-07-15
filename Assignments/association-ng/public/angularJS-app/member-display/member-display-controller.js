angular.module("assoApp").controller("MemberController", MemberController);

function MemberController(MembersDataFactory, $routeParams, $location){
    const vm = this;
    vm.title = "Info test";
    const memberId = $routeParams.memberId;
    MembersDataFactory.getOne(memberId).then(function(response){
        vm.member = response;
    });
    vm.delete = function(memberId){
        MembersDataFactory.deleteMember(memberId).then(function(response){
            console.log("Member deleted");
            $location.path("/");
        }).catch(function(error){
            console.log("Error deleting", error);
        });

    }
}