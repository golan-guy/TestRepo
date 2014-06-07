angular.module('JobType', ['extFilters','jobTypesService'])

	.controller('JobTypeController', function($scope,$filter, JobTypes) {
		$scope.formData = {};

		$scope.jobTypes = JobTypes.query();

		$scope.createJobType = function(isValid) {

			if (!isValid) {
				return;
			}
			
			if ($filter('isEmptyObject')($scope.formData)) {
				return;
			}

			if ($scope.formData._id) {
				JobTypes.update({jobTypeId : $scope.formData._id}, $scope.formData);		
				$scope.formData = {};
				return;
			}
			
			JobTypes.save({},$scope.formData,function(jobType) {
				$scope.jobTypes.push(jobType);
			});


			$scope.formData = {};
		};


		$scope.editJobType = function(jobType) {
			$scope.formData = jobType;
		};

		$scope.deleteJobType = function(jobType) {
			JobTypes.delete({},{_id : jobType._id});
			var index = $scope.jobTypes.indexOf(jobType);
			$scope.jobTypes.splice(index,1);

		};
});