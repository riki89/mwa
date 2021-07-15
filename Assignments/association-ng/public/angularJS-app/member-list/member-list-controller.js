angular.module("assoApp").controller("MembersController", MembersController);

function MembersController(MembersDataFactory, $location){
    const vm = this;
    vm.title = "Test controller";
    MembersDataFactory.getAll().then(function(response){
        vm.members = response;
    });

    vm.addMember = function(){
        console.log("addMember");
        let postData = {
            title: vm.newMemberTitle,
            firstName: vm.newMemberFirstName,
            lastName: vm.newMemberLastName,
            phoneNumber: vm.newMemberPhoneNumber,
            
        };
        if (vm.memberForm.$valid){
            MembersDataFactory.addMember(postData)
                .then(function(response){
                    console.log("Member saved", response);
                    $location.path("/members");
                }).catch(function(error){
                    console.log("Error while saving",error);
                })
        } else {
            console.log("Member form not valid");
        }
    };
}