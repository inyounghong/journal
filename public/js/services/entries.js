angular.module('entryService', [])

	// super simple service
	// each function returns a promise object
	.factory('Entries', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/entries');
			},
			getOnDate : function(date) {
				return $http.get('/api/entries/' + date);
			},
			create : function(entryData) {
				return $http.post('/api/entries', entryData);
			},
			update : function(entryData) {
				console.log(entryData);
				return $http.post('/api/entries/' + entryData._id, entryData);
			},
			delete : function(id) {
				return $http.delete('/api/entries/' + id);
			}
		}
	}]);
