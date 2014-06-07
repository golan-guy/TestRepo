angular.module('Login', [])
    .controller('LoginController', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
    function ($scope, $location, $window, UserService, AuthenticationService) {
        $scope.formData = {};

        //Admin User Controller (login, logout)
        $scope.login = function (username, password) {
            if ($scope.formData.username !== undefined && $scope.formData.password !== undefined) {
 
                UserService.login($scope.formData.username, $scope.formData.password).success(function(data) {
                    AuthenticationService.isAuthenticated = true;
                    AuthenticationService.isAdmin = data.isAdmin;
                    AuthenticationService.name = data.name;             
                    AuthenticationService.username = data.username;
                    $window.sessionStorage.token = data.token;
                    $location.path("/calendar");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        };
 
        $scope.logout = function() {
            if (AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = false;
                AuthenticationService.name = AuthenticationService.username = '';
                AuthenticationService.isAdmin = false;
                delete $window.sessionStorage.token;
                $location.path("/login");
            }
        };

        $scope.register = function() {
            if (AuthenticationService.isAuthenticated) {
                $location.path("/calendar");
                return;
            }            
            UserService.register($scope.formData.name,$scope.formData.username, $scope.formData.password, $scope.formData.passwordConfirmation).success(function(data) {
                $location.path("/login");
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });            
        };

    }]);