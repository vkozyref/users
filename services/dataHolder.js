(function(){
	angular.module('users').factory('dataHolder', function(){
		var service = {
			getUsers: getUsers
		};

		var records = [];

		function getUsers(count, filter){

		};

		return service;
	});
})()