	angular.module('Appointment', ['appointmentService','clientsService','ui.bootstrap.datetimepicker'])

	// inject the Todo service factory into our controller
	.controller('AppointmentController', function($scope,$rootScope,$filter,Appointments,Technicians,JobTypes,Status,ClientsAutocomplete) {
		$scope.formData = {};
		$scope.technicians = Technicians.query();
		$scope.statusList = Status.query();
		$scope.jobTypes = JobTypes.query();
		
		$scope.formData.startTime = new Date();
		$scope.formData.displayStartTime = $scope.formData.startTime;
		$scope.formData.endTime = new Date($scope.formData.startTime.getTime() + (2*1000*60*60));
		$scope.formData.displayEndTime = $scope.formData.endTime;		

		$scope.createAppointment = function(isValid) {

			$scope.submitted = true;

			if (!isValid) {	
				return;
			}
			$scope.submitted = false;			
			var technicians = $scope.formData.technicians;

			if ($scope.formData._id) {
				Appointments.update({appointmentId : $scope.formData._id}, $scope.formData, function(appointment) {
					$rootScope.$broadcast('addAppointment',{appointment: appointment, technicians : technicians});
				});

				$scope.formData = {};	
				return;			
			}

			Appointments.save({},$scope.formData,function(appointment) {
				$rootScope.$broadcast('addAppointment',{appointment: appointment, technicians : technicians});
			});


			 $scope.formData = {};	
		};

		$scope.deleteAppointment = function(appointment) {
			Appointments.delete({},{_id : appointment._id});
		};
	

		$scope.clients= [];
		$scope.getClients = function(val) {
			return ClientsAutocomplete.getClients(val).then(function(data){			
				$scope.clients = [];
				for (var i = data.length - 1; i >= 0; i--) {
					$scope.clients.push(data[i]);				
				};
				return $scope.clients;
			});			
		};
			
		$scope.formatLabel = function(model) {			
			for (var i = $scope.clients.length - 1; i >= 0; i--) {
				if ($scope.clients[i]._id === model) {
					return $scope.clients[i].cIndex;
				}
			};
		};

		//#region events
		$scope.$on('currentAppointment',function(e,data) {			
			$scope.clients = [];
			$scope.clients.push(data.client);		
			$scope.formData = data;
			$scope.formData.client = data.client._id;			
			$scope.formData.displayStartTime = $scope.formData.startTime;
			$scope.formData.displayEndTime = $scope.formData.endTime;
		});

		$scope.$on('deleteAppointment',function(err,appointmentId) {
			$scope.deleteAppointment({_id : appointmentId});
		});

		$scope.validateStartTime = function (newValue,oldValue) {
			$scope.formData.displayStartTime = newValue;

			var now = new Date();					
			if (now > newValue) {				
				$scope.appointmentForm.startTime.$setValidity('beforedate',false);
				return;
			}

			$scope.appointmentForm.startTime.$setValidity('beforedate',true);

			
			if (!$scope.formData.endDate) {
				$scope.formData.endDate = new Date(newValue.getTime() + (2*1000*60*60));
				return;
			}
			var endDate = new Date($scope.formData.endDate);			
			if (endDate < newValue) {
				$scope.formData.endDate = new Date(newValue.getTime() + (2*1000*60*60));
			}
			

		};

		$scope.validateEndTime = function (newValue,oldValue) {
			var startTime = new Date($scope.formData.startTime);

			$scope.formData.displayEndTime = newValue;

			if (startTime > newValue) {
				$scope.appointmentForm.endTime.$setValidity('beforestartdate',false);
				return;
			}		

			if (startTime.getDay() > newValue.getDay()) {
				$scope.appointmentForm.endTime.$setValidity('beforestartdate',false);
				return;
			}


			$scope.appointmentForm.endTime.$setValidity('beforestartdate',true);
		};

		$scope.validateClient = function() {					
			for (var i = $scope.clients.length - 1; i >= 0; i--) {
				if ($scope.clients[i]._id === $scope.formData.client) {
					return;
				}
			}
			$scope.formData.client = null;
		};
		//#endregion

		$scope.reset = function(){
			$scope.formData = {};
			$scope.submitted = false;
			$scope.formData.displayStartTime = null;
			$scope.formData.displayEndTime = null;
		};
	});	