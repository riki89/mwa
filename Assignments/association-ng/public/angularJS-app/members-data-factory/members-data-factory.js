angular.module("assoApp").factory("MembersDataFactory", MembersDataFactory);

function MembersDataFactory($http) {
    return {
        getAll: getAllMembers,
        getOne: getOneMember,
        getContributions: getContributions,
        addMember: addMember,
        deleteMember: deleteMember,
        addContribution: addContribution,
        deleteContribution: deleteContribution,
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

    function addMember(member){
        return $http.post("/api/members", member).then(complete).catch(failed);
    }

    function deleteMember(memberId) {
        return $http.delete("/api/members/"+memberId).then(complete).catch(failed);
    }

    function addContribution(memberId, contribution){
        return $http.post("/api/members/"+memberId+"/contibutions", contribution).then(complete).catch(failed);
    }

    function deleteContribution(memberId, contributionId) {
        return $http.delete("/api/members/"+memberId+"/contributions/"+contributionId).then(complete).catch(failed);
    }

    function complete(response) {
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}