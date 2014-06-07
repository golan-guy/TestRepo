angular.module('technicianService', [])
	.factory('Technicians', function($resource) {
		return $resource('/api/technicians/:technicianId',
			{ technicianId:'@_id' },
			{ update: { method: 'PUT'}}
		);	
	});