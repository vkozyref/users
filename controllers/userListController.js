(function(){
	angular.module('users').controller('userListController', ['$scope', 'dataHolder', function($scope, dataHolder){
				$scope.gridOptions = {
			columnsInfo: [
				{
					name: 'id',
					hidden: true,
					type: 'number'
				},
				{
					name: 'firstName',
					displayName: 'First Name',
					type: 'text'
				},
				{
					name: 'secondName',
					displayName: 'Second Name',
					type: 'text'
				},
				{
					name: 'email',
					displayName: 'Email',
					type: 'text'
				},
				{
					name: 'age',
					displayName: 'Age',
					type: 'number'
				}
			],
			defaults: {
				paging: null,
				filter: null,
				sort: null
			},
			actions: {
				getRecords: dataHolder.getUsers
			}
		};
	}]);	
})();