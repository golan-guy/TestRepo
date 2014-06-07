angular.module('jobTypesService', [])
	.factory('JobTypes', function($resource) {
		return $resource('/api/jobtypes/:jobTypeId',
			{ jobTypeId:'@_id' },
			{ update: { method: 'PUT'}}
		);	
	});