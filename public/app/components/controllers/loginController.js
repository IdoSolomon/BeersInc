/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('loginController', ['UserService', '$http', "$location", "$window", "$scope",
        function(UserService, $http, $location, $window, $scope){
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
                        $window.alert('You are logged in');
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
                            self.answerOutput = response.data.Password;
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