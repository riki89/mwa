angular.module("jobApp").controller("SkillsController", SkillsController);

function SkillsController(JobDataFactory, $routeParams, $window){
    const vm = this;
    const jobId = $routeParams.jobId;
    vm.jobId = jobId;
    JobDataFactory.getAllSkills(jobId).then(function(response){
        console.log("rep", response.skills);
        vm.skills = response.skills;
    });
    JobDataFactory.getOneSkill(jobId).then(function(response){
        vm.job = response;
    });
    const skillId = $routeParams.skillId;
    vm.delete = function(jobId, skillId){
        JobDataFactory.deleteSkill(jobId, skillId).then(function(response){
            $window.location.reload();
            console.log("Skill deleted", response);
           
        }).catch(function(error){
            console.log("Error deleting", error);
        });

    }

    vm.addSkill = function(){
        console.log("Add Skill......");
        const postData = {
            name : vm.newSkill
        };
        if (vm.skillForm.$valid){
            JobDataFactory.addSkill(jobId, postData)
                .then(function(response){
                    $window.location.reload();
                    console.log(response);
                }).catch(function(error){
                    console.log(error);
                })
        }
        
    }

}