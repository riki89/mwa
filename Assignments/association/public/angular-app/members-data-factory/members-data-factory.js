angular.module("assoApp").factory("MembersDataFactory", MembersDataFactory);

function MembersDataFactory($http) {
    return {
        getAll: getAllMembers,
        getOne: getOneMember,
        getContributions: getContributions
    }

    function getAllMembers() {
        return $http.get("/api/members").then(complete).catch(failed);
    }

    function getOneMember(id) {
        return $http.get("/api/members/" + id).then(complete).catch(failed);
    }

    function getContributions(memberId) {
        return $http.get("/api/members/"+memberId+"/contributions").then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}