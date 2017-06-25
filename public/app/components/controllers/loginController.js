/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('loginController', ['UserService', '$http', "$location", "$window",
        function(UserService, $http, $location, $window){
            var self = this;
            self.msg = 'Login';
            self.user = {"username": '', "password": ''};

            self.login = function(valid) {
                if (valid) {
                    UserService.login(self.user).then(function (success) {
                        $window.alert('You are logged in');
                        $location.path('/');
                    }, function (error) {
                        self.errorMessage = error.data.reason;
                        $window.alert(error.data.reason);
                    })
                }

            };
    }]);