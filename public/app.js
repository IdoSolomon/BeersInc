var app = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('node_angular_App');
});
//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService', function (UserService) {
    var vm = this;
    vm.userService = UserService;
}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('homeCtrl', function () {
    var self = this;
    self.msg = 'Home';
});
//-------------------------------------------------------------------------------------------------------------------
app.controller('loginCtrl', ['UserService', '$location', '$window',
    function (UserService, $location, $window) {
    var self = this;
    self.msg = 'Login';
    self.user = {username: '', password: ''};

    self.login = function(valid) {
        if (valid) {
            UserService.login(self.user).then(function (success) {
                $window.alert('You are logged in');
                $location.path('/');
            }, function (error) {
                self.errorMessage = error.data;
                $window.alert('log-in has failed');
            })
        }

    };
}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('registerCtrl', function () {
    var self = this;
    self.msg = 'Register';
});
//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', function($http) {
    var service = {};
    service.isLoggedIn = false;
    service.login = function(user) {

        return $http.post('http://localhost:3100/login', user)
            .then(function(response) {
                var token = response.body.token;
                alert(token+" token");
                $http.defaults.headers.common = {
                    'my-Token': token,
                    'user' : user.username
                };
                service.isLoggedIn = true;
                return Promise.resolve(response);
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };
    return service;
}]);
//-------------------------------------------------------------------------------------------------------------------
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller : "homeCtrl"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller : "loginCtrl"
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller: "registerCtrl"
        })
        .otherwise({redirect: '/',
        });
}]);
