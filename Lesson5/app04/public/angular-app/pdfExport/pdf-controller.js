angular.module("meanGames").controller("PDFController", PDFController);


function PDFController(GamesDataFactory, $scope){
    const vm = this;
    const pdf = {};
    vm.submit = function(){
        vm.url = $scope.pdf.url;
        vm.name = $scope.pdf.name;
        GamesDataFactory.exportPDF(vm.url, vm.name)
            .then(function(response){
                vm.result = response;
            }, vm.message = "file exported successfully")
            .catch(err => console.log("Error export file", err));
    }
}