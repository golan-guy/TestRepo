angular.module('Status', ['extFilters','statusService'])

	.controller('StatusController', function($scope,$filter, Status) {
		$scope.formData = {};

		$scope.statusList = Status.query();

		$scope.createStatus = function(isValid) {

			if (!isValid) {
				return;
			}
			
			if ($filter('isEmptyObject')($scope.formData)) {
				return;
			}

			if ($scope.formData._id) {
				Status.update({statusId : $scope.formData._id}, $scope.formData);		
				$scope.formData = {};
				return;
			}
			
			Status.save({},$scope.formData,function(status) {
				$scope.statusList.push(status);
			});


			$scope.formData = {};
		};


		$scope.editStatus = function(status) {
			$scope.formData = status;
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteStatus = function(status) {
			Status.delete({},{_id : status._id});
			var index = $scope.statusList.indexOf(status);
			$scope.statusList.splice(index,1);

		};
});