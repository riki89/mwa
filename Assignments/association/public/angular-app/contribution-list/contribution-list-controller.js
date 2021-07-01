angular.module("assoApp").controller("ContributionsController", ContributionsController);

function ContributionsController(MembersDataFactory, $routeParams, $window){
    const vm = this;
    const memberId = $routeParams.memberId;
    MembersDataFactory.getContributions(memberId).then(function(response){
        vm.contributions = response;
    });
    vm.addContribution = function(){
        console.log("addContribution");
        let postData = {
            type: vm.newContType,
            amount: vm.newContAmount,
            date: vm.newContDate
        };
        if (vm.contributionForm.$valid){
            MembersDataFactory.addContribution(memberId, postData)
                .then(function(response){
                    console.log("Contribution saved", response);
                    $window.location.reload();
                }).catch(function(error){
                    console.log("Error while saving",error);
                })
        } else {
            console.log("Contribution form not valid");
        }
    };

    const contributionId = $routeParams.contributionId;
    vm.deleteContribution = function(memberId, contributionId){
        GamesDataFactory.deleteContribution(memberId, contributionId).then(function(response){
            console.log("Contribution deleted");
            $location.path("/");
        }).catch(function(error){
            console.log("Error deleting", error);
        });

    }
}