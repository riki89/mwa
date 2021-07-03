angular.module("jobApp").controller("SkillsController", SkillsController);

function SkillsController($routeParams){
    const vm = this;
    JobDataFactory.getAllSkills().then(function(response){
        vm.job = response;
    });
    const skillId = $routeParams.skillId;
    JobDataFactory.getOneSkill(skillId).then(function(response){
        vm.job = response;
    });

}