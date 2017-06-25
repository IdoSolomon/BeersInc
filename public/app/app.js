var app = angular.module('myApp', ["ngRoute"]);
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

        return $http.post('http://localhost:3100/controllers', user)
            .then(function(response) {
                var token= response.data.token;
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
            templateUrl : "../views/home.html",
            controller : "homeCtrl"
        })
        .when("/controllers", {
            templateUrl : "../views/loginView.html",
            controller : "loginController"
        })
        .when("/register", {
            templateUrl : "../views/register.html",
            controller: "registerCtrl"
        })
        .when("/products", {
            templateUrl : "../views/products.html",
            controller: "productsController"
        })
        .otherwise({redirect: '/',
        });
}]);
