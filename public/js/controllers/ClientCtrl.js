angular.module('Client', ['extFilters','clientsService'])
	.controller('ClientController', function($scope,$filter,Clients) {
		$scope.formData = {};	
		
		$scope.clients = Clients.query();

		$scope.createClient = function(isValid) {
			if (!isValid) {
				return;
			}


			if ($filter('isEmptyObject')($scope.formData)) {
				return;
			}

			if ($scope.formData._id) {
				Clients.update({clientId : $scope.formData._id}, $scope.formData);		
				$scope.formData = {};
				return;
			}
			
			Clients.save({},$scope.formData,function(client) {
				
			});


			$scope.formData = {};
		};

		$scope.deleteClient = function(client) {
			Clients.delete({},{_id : client._id});
		};
	});