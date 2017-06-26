/**
 * Created by Ido on 26/06/2017.
 */
angular.module('myApp')
    .controller('homeController', ['UserService', 'cookieService', '$http', "$location", "$window", "$scope",
        function(UserService, cookieService, $http, $location, $window, $scope){
            let self = this;
            self.msg = 'Home';
            $http.get('http://localhost:3100/GetHottest5')
                .then(function(response) {
                    self.hotBeers = response.data;
                }, function (error) {
                    console.error('Error while fetching products')
                });
        }]);