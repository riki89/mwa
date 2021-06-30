angular.module("assoApp").controller("MemberController", MemberController);

function MemberController(MembersDataFactory, $routeParams){
    const vm = this;
    vm.title = "Info test";
    const memberId = $routeParams.memberId;
    MembersDataFactory.getOne(memberId).then(function(response){
        vm.member = response;
    })
}