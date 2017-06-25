/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('productsController', ['UserService', "$http", "$location", "$window",
        function(UserService, $http, $location, $window){
            var self = this;
            self.msg = 'Products';
            $http.get('http://localhost:3100/GetAllProducts')
                .then(function(response) {
                    self.beers = response.data;
            }, function (error) {
                    console.error('Error while fetching products')
                });
            }
    ]);
