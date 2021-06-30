angular.module("assoApp").controller("ContributionsController", ContributionsController);

function ContributionsController(MembersDataFactory, $routeParams){
    const vm = this;
    vm.title = "Contribution....";
    const memberId = $routeParams.memberId;
    MembersDataFactory.getContributions(memberId).then(function(response){
        vm.contributions = response;
    })
}