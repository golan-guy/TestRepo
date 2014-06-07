angular.module('clientsService', [])
	.factory('Clients', function($resource) {
		return $resource('/api/clients/:clientId',
			{ clientId:'@_id' },
			{ update: { method: 'PUT'}}
		);	
	})
	.factory('ClientsAutocomplete', function($http,$q) {
		return {
			getClients : function(term) {
				var defer = $q.defer();
				$http.get('/api/clients',{ params : {cIndex: term}}).success(function(clients){
					defer.resolve(clients);
				}).error(function(err){
					defer.reject(err);
				});

				return defer.promise;

			}
		}
	});