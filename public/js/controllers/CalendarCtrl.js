angular.module('Calendar', ['extFilters','calendar.directives','Appointment','Technician','JobType','Status','Client'])
	.controller('CalendarController', function($scope,AuthenticationService) {
		$scope.userDetails = {
			name : AuthenticationService.name
		};
	});
