/**
 * Created by Ido on 26/06/2017.
 */
angular.module('myApp')
    .controller('mainController', ['UserService', 'cookieService', '$http', "$location", "$window", "$rootScope", "$scope",
        function(UserService, cookieService, $http, $location, $window, $rootScope, $scope){
            let self = this;
            let userid = cookieService.getCookie('user-id');
            let token = cookieService.getCookie('user-token');
            if(userid !== null && token !== null)
            {
                $http.post('http://localhost:3100/ValidateCookie', { "userid": userid, "token": token })
                    .then(function(verdict) {
                        self.hasCookie = verdict.data;
                        if(self.hasCookie)
                        {
                            $rootScope.lastLogin = "Your last login was at " + cookieService.getCookie('user-lastVisit');
                            cookieService.setNewLoginDate();
                            $rootScope.loginState = true;
                            $rootScope.currentUser = userid;
                        } else {
                            $rootScope.lastLogin = "";
                            $rootScope.loginState = false;
                            $rootScope.currentUser = "Guest";
                        }
                    })
            }
            self.logout = function ()
            {
                $rootScope.lastLogin = "";
                $rootScope.loginState = false;
                $rootScope.currentUser = "Guest";
                cookieService.removeAll();
                $window.alert('You have successfully logged out.');
            };
        }]);