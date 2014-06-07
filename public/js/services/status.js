angular.module('statusService', [])
	.factory('Status', function($resource) {
		return $resource('/api/statuses/:statusId',
			{ statusId:'@_id' },
			{ update: { method: 'PUT'}}
		);	
	});