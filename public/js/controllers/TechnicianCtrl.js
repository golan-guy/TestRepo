angular.module('Technician', ['extFilters','technicianService'])

	.controller('TechnicianController', function($scope,$rootScope,$filter, Technicians) {
		$scope.formData = {};

		$scope.technicians = Technicians.query();

		$scope.createTechnician = function(isValid) {

			if (!isValid) {
				return;
			}
			
			if ($filter('isEmptyObject')($scope.formData)) {
				return;
			}

			if ($scope.formData._id) {
				Technicians.update({technicianId : $scope.formData._id}, $scope.formData);		
				$scope.formData = {};
				return;
			}
			
			Technicians.save({},$scope.formData,function(technician) {
				$scope.technicians.push(technician);
			});


			$scope.formData = {};
		};


		$scope.editTechnician = function(technician) {
			$scope.formData = technician;
		};

		$scope.deleteTechnician = function(technician) {
			Technicians.delete({},{_id : technician._id});
			var index = $scope.technicians.indexOf(technician);
			$scope.technicians.splice(index,1);

		};

		$scope.updateAppointment = function(appointment) {
			var data = angular.copy(appointment);			 
			data.client = data.client;
			data.status = data.status._id;					
			data.jobType = data.jobType._id;
			data.technicians = findRelatedTechnicians(appointment._id);
			$rootScope.$broadcast('currentAppointment',data);
		}

		$scope.deleteAppointment = function(technician,appointment) {
			var index = technician.appointments.indexOf(appointment),
				data = {
					name : technician.name,
					phone: technician.phone,
					isActive : technician.isActive,
					appointments : []
				};

			technician.appointments.splice(index,1);
			for (var i = technician.appointments.length - 1; i >= 0; i--) {
				data.appointments.push(technician.appointments[i]._id);
			}
			Technicians.update({technicianId : technician._id}, data);

			var relatedTechnicians = findRelatedTechnicians(appointment._id);
			if (!relatedTechnicians.length) {
				$rootScope.$broadcast('deleteAppointment',appointment._id);
			}
		}

		function findRelatedTechnicians(appointmentId) {
			var technicians = [],technician,appointment;
			for (var i = $scope.technicians.length - 1; i >= 0; i--) {
				technician = $scope.technicians[i];
				for (var j = technician.appointments.length - 1; j >= 0; j--) {
					appointment = technician.appointments[j];
					if (appointment._id === appointmentId) {
						technicians.push(technician._id);
					}
				};
			};

			return technicians;
		}

		$scope.$on('addAppointment',function(e,data) {						
			for (var i = $scope.technicians.length - 1; i >= 0; i--) {				
				for (var j = $scope.technicians[i].appointments.length - 1; j >= 0; j--) {
					if ($scope.technicians[i].appointments[j]._id === data.appointment._id) {
						$scope.technicians[i].appointments.splice(j,1);
					}					
				};
				
				if (data.technicians.indexOf($scope.technicians[i]._id) >= 0) {
					$scope.technicians[i].appointments.push(data.appointment)
				}
			};
		});
});