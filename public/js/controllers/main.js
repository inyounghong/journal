angular.module('entryController', [])

	// inject the Entry service factory into our controller
	.controller('mainController', ['$scope','$http','Entries', function($scope, $http, Entries) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.formatDate = formatDate;

		$scope.entryTypes = ["Events", "Musings", "Funny"];

		$scope.entryTypeOptions = generateEntryTypeOptions($scope.entryTypes);
    	$scope.formData.type = $scope.entryTypeOptions[0].value;



		// Calendar
		$scope.calendar = setCalendar();
		$scope.selectDate = function(date) {
			console.log("selecting " + formatDateJS(date));
			$scope.calendar.selectedDate = date;
			$scope.entries = getOnDate(date);
		}
		$scope.formatDateJS = formatDateJS;
		$scope.isSelected = function(checkingDate) {
			return $scope.calendar.selectedDate.getDate() == checkingDate.getDate() &&
				$scope.calendar.selectedDate.getMonth() == checkingDate.getMonth();
		}


		// GET =====================================================================
		// when landing on the page, get all entries and show them
		// use the service to get all the entries
		Entries.get()
			.success(function(data) {
				$scope.entries = data;
				$scope.loading = false;
			});

		function getOnDate(date) {
			console.log("getting for " + date.getDate());
			Entries.getOnDate(date.getDate())

				// if successful creation, call our get function to get all the new entries
				.success(function(data) {
					$scope.loading = false;
					$scope.entries = data; // assign our new list of entries
					$scope.formData.type = $scope.entryTypeOptions[0].value;
				});
		}

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createEntry = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;
				$scope.formData.dateDB = new dateDB($scope.calendar.selectedDate);

				// call the create function from our service (returns a promise object)
				Entries.create($scope.formData)

					// if successful creation, call our get function to get all the new entries
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.entries = getOnDate($scope.calendar.selectedDate); // assign our new list of entries
						$scope.formData.type = $scope.entryTypeOptions[0].value;
					});
			}
		};

		$scope.updateEntry = function(entry) {
			console.log("updating entry to type " + entry.type);
			Entries.update(entry)
				.success(function(data) {
					console.log("success!");
					$scope.entries = data; // assign our new list of entries
				});
		}

		// DELETE ==================================================================
		// delete a entry after checking it
		$scope.deleteEntry = function(id) {
			$scope.loading = true;

			Entries.delete(id)
				// if successful creation, call our get function to get all the new entries
				.success(function(data) {
					$scope.loading = false;
					$scope.entries = data; // assign our new list of entries
				});
		};
	}]);


function generateEntryTypeOptions(typeArr) {
	var result = [];
	for (var i = 0; i < typeArr.length; i++) {
		result.push( {name: typeArr[i], value: i} );
	}
	return result;
}

function formatDate(date) {
	return monthNames[date.month] + " " + date.day + ", " + date.year;
}

// Returns a date object for the entry db from a javascript date object
function dateDB(date) {
	this.day = date.getDate();
	this.month = date.getMonth();
	this.year = date.getFullYear();
}
