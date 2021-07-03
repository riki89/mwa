angular.module("jobApp").factory("JobDataFactory", JobDataFactory);

function JobDataFactory($http){
    return {
        getAll: getAllJobs,
        getOne: getOneJob,
        addJob: addJob,
        deleteJob: deleteJob,
        partialUpdateJob: partialUpdateJob,
        fullUpdateJob: fullUpdateJob,
        getLocation: getLocation,
        addLocation: addLocation,
        deleteLocation: deleteLocation,
        updateLocation: updateLocation,
        getAllSkills: getAllSkills,
        getOneSkill: getOneSkill,
        addSkill: addOneSkill,
        deleteSkill: deleteSkill
    }

    function getAllJobs(){
        return $http.get("/api/job").then(complete).catch(failed);
    }

    function getOneJob(jobId){
        return $http.get("/api/job/"+jobId).then(complete).catch(failed);
    }

    function addJob(job){
        return $http.post("/api/job", job).then(complete).catch(failed);
    }
    function deleteJob(jobId){
        return $http.delete("/api/job/"+jobId).then(complete).catch(failed);
    }
    function partialUpdateJob(jobId){
        return $http.patch("/api/job/"+jobId).then(complete).catch(failed);
    }
    function fullUpdateJob(jobId){
        return $http.put("/api/job/"+jobId).then(complete).catch(failed);
    }
    function getLocation(jobId){
        return $http.get("/api/job/"+jobId+"/location").then(complete).catch(failed);
    }
    function addLocation(jobId, location){
        return $http.post("/api/job/"+jobId+"/location", location).then(complete).catch(failed);
    }
    function deleteLocation(jobId){
        return $http.delete("/api/job/"+jobId+"/location").then(complete).catch(failed);
    }
    function updateLocation(jobId){
        return $http.put("/api/job/"+jobId+"/location").then(complete).catch(failed);
    }
    function getAllSkills(jobId){
        return $http.get("/api/job/"+jobId+"/skills").then(complete).catch(failed);
    }
    function getOneSkill(jobId, skillId){
        return $http.get("/api/job/"+jobId+"/skills/"+skillId).then(complete).catch(failed);
    }
    function addOneSkill(jobId, skill){
        return $http.post("/api/job/"+jobId+"/skills", skill).then(complete).catch(failed);
    }
    function deleteSkill(jobId, skillId){
        return $http.delete("/api/job/"+jobId+"/skills/"+skillId).then(complete).catch(failed);
    }
    
    function complete(response){
        return response.data;
    }

    function failed(error){
        return error.status.statusText;
    }
}