/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('productsController', ['UserService','cartService', "$http", "$location",
        "$window", "$scope", "$window", function (UserService, cartService, $http, $location, $window, $scope,$rootScope, $mdDialog) {
            var self = this;
            self.msg = 'Products';
            self.selectedBeer = '';
            self.selectedBeerQuantity = 0;
            self.filterBy = "";
            self.fieldToOrderBy = "BeerName";
            self.reverseSort = false;
            $scope.tdStyle = {
                "font-size" : "24px",
                "font-weight" : "bold"
            };
            $http.get('http://localhost:3100/GetConversionRate')
                .then(function(response) {
                    self.conversionRate = response.data;
                }, function (error) {
                    console.error('Error while fetching products')
                });

            $http.get('http://localhost:3100/GetAllProducts')
                .then(function(response) {
                    self.beers = response.data;
                    for (var i=0; i<self.beers.length; i++)
                        self.beers[i].Quantity = 0;
                }, function (error) {
                    console.error('Error while fetching products')
                });


            $scope.open = function (beer) {
                self.selectedBeer = beer;
                self.selectedBeerQuantity = 0;
                $scope.showModal = true;
            };

            $scope.increaseSelectedItemCount = function() {
                self.selectedBeerQuantity++;
            };
            $scope.increaseItemCount = function(item) {
                item.Quantity++;
            };
            $scope.decreaseSelectedItemCount = function() {
                if (self.selectedBeerQuantity > 0) {
                    self.selectedBeerQuantity--;
                }
            };
            $scope.decreaseItemCount = function(item) {
                if (item.Quantity > 0) {
                    item.Quantity--;
                }
            };
            self.addToCart = function () {
                cartService.addToCart(self.selectedBeer,self.selectedBeerQuantity );
                $window.alert('Product was successfully added to cart/');

            };
            self.addToCart = function (item) {
                cartService.addToCart(item,item.Quantity);
                item.Quantity = 0;
                $window.alert('Product was successfully added to cart/');

            };

        }]);
