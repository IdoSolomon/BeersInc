/**
 * Created by Liorpe on 25/06/2017.
 */
/**
 * Created by Liorpe on 24/06/2017.
 */
angular.module('myApp')
    .controller('registerController', ['UserService', "$scope", "$http", "$location", "$window",
        function(UserService,$scope, $http){
            var self = this;
            self.msg = 'Register';
            self.username ='';
            self.uniqueUserName = false;
            self.password ='';
            self.question  ='';
            self.answer = '';
            self.allQuestions = ['What is your pet`s name?', 'What is the first and last name of your first boyfriend ' +
            'or girlfriend?', 'What is the name of the hospital in which you were born??' ]
            //GetCAllCategories
            $http.get('http://localhost:3100/GetCAllCategories')
                .then(function(response) {
                    self.categoies = response.data;
                }, function (error) {
                    console.error('Error while fetching products')
                });


            $scope.selection = [];

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
            
            $scope.validateUniqueUsername = function () {
                if (self.username = '')
                    return;
                $http.post('http://localhost:3100/IsUniqueUsername', {'Username':self.username})
                    .then(function(response){
                        self.uniqueUserName = response.data.Ans;
                        if (self.uniqueUserName ===false)
                        {
                            alert("User name is already taken");
                            self.username = '';

                        }
                        }

                    )

            }
            
            self.submit = function () {


            }
        }

    ]);
