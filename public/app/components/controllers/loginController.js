/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('loginController', ['UserService', 'cookieService', '$http', "$location", "$window", "$rootScope", "$scope",
        function(UserService, cookieService, $http, $location, $window, $rootScope, $scope){
            let self = this;
            self.msg = 'Login';
            self.user = {"username": '', "password": ''};
            self.showFP = false;
            self.question = '';
            self.answer = '';
            self.answerOutput = '';
            self.validUser = false;
            self.login = function(valid) {
                if (valid) {
                    UserService.login(self.user).then(function (success) {
                        $rootScope.loginState = true;
                        $rootScope.currentUser = self.user.username;
                        cookieService.addNewCookie(self.user.username, success.data.token);
                        $rootScope.lastLogin = "Your last login was at " + cookieService.getCookie('user-lastVisit');
                        $window.alert('You have successfully logged in.');
                        $location.path('/');
                    }, function (error) {
                        self.errorMessage = error.data.reason;
                        $window.alert(error.data.reason);
                    })
                }

            };
            self.validateQuestion = function(valid) {
                if (valid) {
                    return $http.post('http://localhost:3100/ValidateAnswer', { "Username": self.user.username, "Question": self.question.substring(0, self.question.length-1), "Answer": self.answer })
                        .then(function(response) {
                            let pass = response.data.Password;
                            if(pass === "")
                                self.answerOutput = "Answer is incorrect";
                            else self.answerOutput = "Password retrieved: " + pass;
                        }, function (error) {
                            console.error('Error while validating username')
                        });
                }

            };
            $scope.toggleFP = function() {
                if(self.showFP === true)
                {
                    self.showFP = false;
                    self.question = '';
                    self.answer = '';
                    self.validUser = false;
                }
                else {
                    let req = { "Username": self.user.username };
                    return $http.post('http://localhost:3100/IsUniqueUsername', req)
                        .then(function(response) {
                            self.validUser = !response.data.Ans;
                            self.showFP = true;
                            if(self.validUser)
                            {
                                return $http.post('http://localhost:3100/ForgotPassword', req)
                                    .then(function(response) {
                                        self.question = response.data[0].Question + "?";
                                    }, function (error) {
                                        console.error('Error while validating username')
                                    });
                            } else self.question = 'Username not found.';
                        }, function (error) {
                            console.error('Error while validating username')
                        });
                }
            };
    }]);