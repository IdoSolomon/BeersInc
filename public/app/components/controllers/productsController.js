/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('productsController', ['UserService', "$http", "$location",
        "$window", "$scope", "$mdDialog", function (UserService, $http, $location, $window, $scope, $mdDialog) {
    var self = this;
    self.msg = 'Products';
    $http.get('http://localhost:3100/GetAllProducts')
        .then(function(response) {
            self.beers = response.data;
        }, function (error) {
            console.error('Error while fetching products')
        });
    // test comment
    // $scope.status = '';
    // $scope.items = [1,2,3,4,5];
    // $scope.showAlert = function(ev) {
    //     $mdDialog.show(
    //         $mdDialog.alert()
    //             .parent(angular.element(document.querySelector('#dialogContainer')))
    //             .clickOutsideToClose(true)
    //             .title('TutorialsPoint.com')
    //             .textContent('Welcome to TutorialsPoint.com')
    //             .ariaLabel('Welcome to TutorialsPoint.com')
    //             .ok('Ok!')
    //             .targetEvent(ev)
    //     );
    // };
    //
    //
    // $scope.showConfirm = function(event) {
    //     var confirm = $mdDialog.confirm()
    //         .title('Are you sure to delete the record?')
    //         .textContent('Record will be deleted permanently.')
    //         .ariaLabel('TutorialsPoint.com')
    //         .targetEvent(event)
    //         .ok('Yes')
    //         .cancel('No');
    //     $mdDialog.show(confirm).then(function() {
    //         $scope.status = 'Record deleted successfully!';
    //     }, function() {
    //         $scope.status = 'You decided to keep your record.';
    //     });
    // };
    //
    // $scope.showCustom = function(event) {
    //     $mdDialog.show({
    //         clickOutsideToClose: true,
    //         scope: $scope,
    //         preserveScope: true,
    //         template: '<md-dialog>' +
    //         '  <md-dialog-content>' +
    //         '     Welcome to TutorialsPoint.com' +
    //         '  </md-dialog-content>' +
    //         '</md-dialog>',
    //         controller: function DialogController($scope, $mdDialog) {
    //             $scope.closeDialog = function() {
    //                 $mdDialog.hide();
    //             }
    //         }
    //     });
    // };
}
    ]);
