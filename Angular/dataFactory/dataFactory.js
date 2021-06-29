angular.module("jobApp").factory("JobFactory", JobFactory);
function JobFactory($http) {
    return {
        getJobs: getJobs,
        getOneJob: getOneJob
    };
    function getJobs() {
        return $http.get("http://api.dataatwork.org/v1/jobs")
            .then(complete)
            .catch(failed)
    }
    function getOneJob(jobId) {
        return $http.get("http://api.dataatwork.org/v1/jobs/"+jobId)
            .then(complete)
            .catch(failed)

    }
    function complete(response) {
        return response.data;
    }
    function failed(error) {
        return error.statusText;
    }
}