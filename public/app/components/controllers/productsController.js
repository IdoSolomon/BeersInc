/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('productsController', ['UserService', "$location", "$window",
        function(UserService, $http, $location, $window){
            var self = this;
            self.beers = $http.get('http://localhost:3100/GetAllProducts');
            }
    ]);
