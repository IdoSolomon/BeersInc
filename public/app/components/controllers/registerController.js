/**
 * Created by Liorpe on 25/06/2017.
 */
/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('registerController', ['UserService', "$scope", "$http", "$location", "$window",
        function (UserService, $scope, $http, $location) {
            var self = this;
            self.msg = 'Register';
            self.username = '';
            self.uniqueUserName = false;
            self.userNameMessage = '';
            self.showUserNameMessage = false;
            self.validUserName = false;
            self.password = '';
            self.passwordMessage = '';
            self.showPasswordMessage = false;
            self.validPassword = false;

            self.question = '';
            self.answer = '';
            self.allQuestions = ['What is your pet`s name?', 'What is the first and last name of your first boyfriend ' +
            'or girlfriend?', 'What is the name of the hospital in which you were born??']
            $scope.selection = [];

            //GetCAllCategories
            $http.get('http://localhost:3100/GetCAllCategories')
                .then(function (response) {
                    self.categoies = response.data;
                }, function (error) {
                    console.error('Error while fetching products')
                });



            // Toggle selection for a given fruit by name
            $scope.toggleSelection = function toggleSelection(category) {
                var idx = $scope.selection.indexOf(category);

                // Is currently selected
                if (idx > -1) {
                    $scope.selection.splice(idx, 1);
                }

                // Is newly selected
                else {
                    $scope.selection.push(category);
                }
            }

            $http.get("app/shared/countries.xml",
                {
                    transformResponse: function (cnv) {
                        var x2js = new X2JS();
                        var aftCnv = x2js.xml_str2json(cnv);
                        return aftCnv;
                    }
                })
                .then(function (response) {
                    self.countries = response.data.Countries.Country;
                });
            self.country = '';

            $scope.userNameUpdate = function () {
                if (self.username === '') {
                    self.showUserNameMessage = false;
                    self.validUserName = false;
                    return;

                }
                if (self.username.length>8)
                {
                    self.showUserNameMessage = true;
                    self.userNameMessage = "Maximum user name length permitted is 8 characters."
                    self.validUserName = false;

                    return;
                }
                $http.post('http://localhost:3100/IsUniqueUsername', {'Username': self.username})
                    .then(function (response) {
                            self.uniqueUserName = response.data.Ans;
                            if (self.uniqueUserName === false) {
                                self.showUserNameMessage = true;
                                self.userNameMessage = "User name is already taken, please choose another user name. "
                                self.validUserName = false;

                            }
                            else {
                                self.showUserNameMessage = false;
                                self.validUserName = true;

                            }
                        }
                    )

            }

            $scope.passwordUpdate = function () {
                if (self.password.length>10)
                {
                    self.showPasswordMessage = true;
                    self.validPassword = false;
                    self.passwordMessage = "Maximum password length must be shorter than 10 characters."
                    return;
                }
                else
                {
                    self.showPasswordMessage = false;
                    self.validPassword = true;


                }

            }
            self.register = function (validDetails) {
                // $scope.validateUniqueUsername();
                if (validDetails === false) {
                    alert("All fields must be submitted in order to perform registration!");
                    return;
                }
                else
                {
                    let registrationFields =
                        JSON.stringify({
                            'Username' : self.username,
                            'Password' : self.password,
                            'CountryID': self.country.ID,
                            'SecurityQuestions': [{"Question": self.question, "Answer": self.answer }],
                            'Categories' : $scope.selection
                        });

                    return $http.post('http://localhost:3100/Register',registrationFields)
                        .then(function (response) {
                            if (response.data.Succeeded==true)
                            {
                                alert("Registration succeeded!");
                                $location.path('/login');
                            }
                            else
                            {
                                alert("Registration failed!\n" +response.data.Details  );

                            }

                            
                        }, function (error) {
                            console.error('Error while fetching products')
                        });




                }

            }
        }

    ]);
