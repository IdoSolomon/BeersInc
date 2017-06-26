/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('productsController', ['UserService', "$http", "$location",
        "$window", "$scope", "$window", function (UserService, $http, $location, $window, $scope,$rootScope, $mdDialog) {
            var self = this;
            self.msg = 'Products';
            self.selectedBeer = '';
            self.selectedBeerQuantity = 0;
            $http.get('http://localhost:3100/GetConversionRate')
                .then(function(response) {
                    self.conversionRate = response.data;
                }, function (error) {
                    console.error('Error while fetching products')
                });
            $http.get('http://localhost:3100/GetAllProducts')
                .then(function(response) {
                    self.beers = response.data;
                }, function (error) {
                    console.error('Error while fetching products')
                });

            $scope.open = function (beer) {
                self.selectedBeer = beer;
                self.selectedBeerQuantity = 0;
                $scope.showModal = true;
            };

            $scope.increaseItemCount = function(item) {
                self.selectedBeerQuantity++;
            };
            $scope.decreaseItemCount = function(item) {
                if (self.selectedBeerQuantity > 0) {
                    self.selectedBeerQuantity--;
                }

            };

        }]);
