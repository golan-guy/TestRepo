angular.module('appointmentService', [])
	.factory('Appointments', function($resource) {
		return $resource('/api/appointments/:appointmentId',
			{ appointmentId:'@_id' },
			{ update: { method: 'PUT'}}
		);	
	});