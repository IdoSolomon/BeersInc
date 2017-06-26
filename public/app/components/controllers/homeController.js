/**
 * Created by Ido on 26/06/2017.
 */
angular.module('myApp')
    .controller('homeController', ['UserService', 'cookieService', '$http', "$location", "$window", "$rootScope", "$scope",
        function(UserService, cookieService, $http, $location, $rootScope, $window, $scope){
            let self = this;
            // self.hasCookie = false;
            self.msg = 'Home';
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
                                    $window.alert('You haz cookie');
                                }
                            })
                    }

                    // if cookie set recommended items (set hasCookie accordingly)

                }, function (error) {
                    console.error('Error while fetching products')
                });
        }]);