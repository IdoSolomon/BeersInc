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
                            for (var i=0; i<self.hotBeers.length; i++)
                                self.hotBeers[i].Quantity = 0;
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
                                                    for (var i=0; i<self.newBeers.length; i++)
                                                        self.newBeers[i].Quantity = 0;
                                                    $http.post('http://localhost:3100/GetRecommended', {"Username":userid})
                                                        .then(function(answer) {
                                                            self.recommendedBeers = answer.data;
                                                            for (var i=0; i<self.recommendedBeers.length; i++)
                                                                self.recommendedBeers[i].Quantity = 0;

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
            self.addSelectedToCart = function () {
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