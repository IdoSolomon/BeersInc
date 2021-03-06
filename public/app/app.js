var app = angular.module('myApp', ['ngRoute', 'routeStyles', 'LocalStorageModule']);
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
                if(response.data.success === false)
                {
                    return Promise.reject(response);
                } else {
                var token= response.data.token;
                    $http.defaults.headers.common = {
                        'my-Token': token,
                        'user' : user.username
                    };
                    service.isLoggedIn = true;
                    return Promise.resolve(response);
                }
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
            controller : "homeCtrl",
            css : "assets/home.css"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller : "loginController",
            css : "assets/login.css"
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller: "registerController",
            css : "assets/register.css"
        })
        .when("/products", {
            templateUrl : "views/products.html",
            controller: "productsController",
            css : "assets/products.css"
        })
        .when("/cart", {
            templateUrl : "views/cart.html",
            controller: "cartController",
            css : "assets/cart.css"
        })
        .otherwise({redirect: '/',
        });
}]);
