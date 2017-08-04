/**
 * Created by Ido on 26/06/2017.
 */
angular.module('myApp')
    .controller('homeController', ['UserService', 'cookieService', 'cartService', '$http', "$location", "$window", "$rootScope", "$scope",
        function(UserService, cookieService, cartService, $http, $location, $rootScope, $window, $scope){
            let self = this;
            // self.hasCookie = false;
            self.msg = 'Home';
            $scope.tdStyle = {
                "font-size" : "24px",
                "font-weight" : "bold"
            };
            self.selectedBeer = '';
            self.selectedBeerQuantity = 0;
            $http.get('http://localhost:3100/GetConversionRate')
                .then(function(response2) {
                    self.conversionRate = response2.data;
                    $http.get('http://localhost:3100/GetHottest5')
                        .then(function(response) {
                            self.hotBeers = response.data;
                            let userid = cookieService.getCookie('user-id');
                            let token = cookieService.getCookie('user-token');
                            if(userid !== null && token !== null)
                            {
                                $http.post('http://localhost:3100/ValidateCookie', { "userid": userid, "token": token })
                                    .then(function(verdict) {
                                        self.hasCookie = verdict.data;
                                        if(self.hasCookie)
                                        {
                                            $http.get('http://localhost:3100/GetNewProducts')
                                                .then(function(answer) {
                                                    self.newBeers = answer.data;
                                                    $http.post('http://localhost:3100/GetRecommended', {"Username":userid})
                                                        .then(function(answer) {
                                                            self.recommendedBeers = answer.data;
                                                        })
                                                })

                                        }
                                    })

                            }

                        }, function (error) {
                            console.error('Error while fetching products')
                        });
                }, function (error) {
                    console.error('Error while fetching products')
                });

            $scope.open = function (beer) {
                self.selectedBeer = beer;
                self.selectedBeerQuantity = 0;
                $scope.showModal = true;
            };

            $scope.increaseItemCount = function() {
                self.selectedBeerQuantity++;
            };
            $scope.increaseItemCount = function(item) {
                item.Quantity++;
            };
            $scope.decreaseItemCount = function() {
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
            self.areNewBeerDisplayed = false;
            self.displayNewBeers = function () {
                self.areNewBeerDisplayed = !self.areNewBeerDisplayed;

            }
            self.areHotBeerDisplayed = false;
            self.displayHotBeers = function () {
                self.areHotBeerDisplayed = !self.areHotBeerDisplayed;

            }
            self.areRecommendedBeerDisplayed = false;
            self.displayRecommendedBeers = function () {
                self.areRecommendedBeerDisplayed = !self.areRecommendedBeerDisplayed;

            }
        }]);