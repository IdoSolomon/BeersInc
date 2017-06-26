/**
 * Created by Liorpe on 26/06/2017.
 */
angular.module('myApp')
    .controller('cartController', ['UserService','cartService', "$http", "$location",
        "$window", "$scope", "$window", function (UserService, cartService, $http, $location, $window, $scope,$rootScope, $mdDialog) {
            var self = this;
            self.selectedBeer='';
            self.beersInOrder = cartService.getCart();
            $http.get('http://localhost:3100/GetConversionRate')
                .then(function(response) {
                    self.conversionRate = response.data;
                }, function (error) {
                    console.error('Error while fetching products')
                });

            self.totalPrice = cartService.getCartTotalPrice();

            this.removeItem = function(item)
            {
                cartService.removeFromCart(item);
                self.totalPrice = cartService.getCartTotalPrice();

            }

            $scope.open = function (beer) {
                self.selectedBeer = beer;
                $scope.showModal = true;

            };

        }]);
