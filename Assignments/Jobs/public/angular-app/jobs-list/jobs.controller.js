angular.module("jobApp").controller("JobsController", JobsController);

function JobsController(JobDataFactory, $window){
    const vm = this;
    JobDataFactory.getAll().then(function(response) {
        vm.jobs = response;
    });

    vm.addJob = function(){
        console.log("Add Job");
        let postData = {
            title: vm.newJobTitle,
            salary: vm.newJobSalary,
            description: vm.newJobDescription,
        
        };
        if (vm.jobForm.$valid){
            JobDataFactory.addJob(postData)
                .then(function(response){
                    $window.location.reload();
                    console.log(response);
                }).catch(function(error){
                    console.log(error);
                })
        }
        
    }
}