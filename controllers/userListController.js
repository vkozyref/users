(function(){
	angular.module('users').controller('userListController', ['$scope', 'dataHolder', function($scope, dataHolder){
		$scope.gridOptions = {
			tableName: 'Users',
			columnsInfo: [
				{
					name: 'id',
					hidden: true,
					type: 'number'
				},
				{
					name: 'firstName',
					displayName: 'First Name',
					type: 'text',
					bootstrapWidth: 3
				},
				{
					name: 'secondName',
					displayName: 'Second Name',
					type: 'text',
					bootstrapWidth: 3
				},
				{
					name: 'email',
					displayName: 'Email',
					type: 'text',
					bootstrapWidth: 3
				},
				{
					name: 'age',
					displayName: 'Age',
					type: 'number',
					bootstrapWidth: 3
				}
			],
			defaults: {
				paging: null,
				filter: null,
				sort: null
			},
			actions: {
				getRecords: dataHolder.getUsers,
				saveRecords: dataHolder.saveUsers,
				editRecord: dataHolder.editUser,
				removeRecords: dataHolder.removeUsers
			}
		};
	}]);

	function edit(records, callback){

	}

	function remove(records){

	}

	function save(records){

	}
})();