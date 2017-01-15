angular.module('entryService', [])

	// super simple service
	// each function returns a promise object
	.factory('Entries', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/entries');
			},
			create : function(entryData) {
				return $http.post('/api/entries', entryData);
			},
			delete : function(id) {
				return $http.delete('/api/entries/' + id);
			}
		}
	}]);
