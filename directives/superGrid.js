(function(){
	angular.module('users').directive('superGrid', function(){
		return {
			templateUrl: 'directives/templates/superGrid.html',
			restrict: 'E',
			scope: {
				options: '='
			},
			link: function(scope, elem, attrs){
				scope.columns = scope.options.columnsInfo.filter(function(c){
					return !c.hidden;
				});

				scope.records = angular.copy(scope.options.actions.getRecords(scope.options.defaults.paging, 
									scope.options.defaults.filter, scope.options.defaults.sort));
			}
		};
	});
})();