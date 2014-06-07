angular.module('CalendarApp', ['ui.bootstrap','ngRoute','Calendar','Login','ngResource','Authentication'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    	.when('/', {        
        templateUrl: 'partials/calendar.html', 
        controller: "CalendarController",
        access: { requiredLogin: true ,is_admin : false}
      })
    	.when('/editTechnicians', {
        templateUrl: 'partials/editTechnicians.html', 
        controller: "TechnicianController",
        access: { requiredLogin: true, is_admin : true }
      })
    	.when('/editStatus', {
        templateUrl: 'partials/editStatus.html', 
        controller: "StatusController",
        access: { requiredLogin: true, is_admin : true }
      })
    	.when('/editJobType', {
        templateUrl: 'partials/editJobType.html', 
        controller: "JobTypeController",
        access: { requiredLogin: true, is_admin : true }
      })
      .when('/register', {
         templateUrl: 'partials/register.html',
         controller: "LoginController",
         access: { requiredLogin: false, is_admin: false }
      })
      .when('/login', {
         templateUrl: 'partials/login.html', 
         controller: "LoginController",
         access: { requiredLogin: false, is_admin: false }
      })
      .otherwise({redirectTo: '/'});
     
    $locationProvider.html5Mode(true);
  }])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
  })
  .run(function($rootScope, $location, $window,AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
      if (nextRoute.$$route != null && nextRoute.$$route.access != null && nextRoute.$$route.access.requiredLogin 
            && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {

            $location.path("/login");
        }
    });
  });



