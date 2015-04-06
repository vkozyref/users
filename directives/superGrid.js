(function(){
	angular.module('users').directive('superGrid', ['$timeout', function($timeout){
		return {
			templateUrl: 'directives/templates/superGrid.html',
			restrict: 'E',
			scope: {
				options: '='
			},
			link: function(scope, elem, attrs){
				scope.sort = sort;
				scope.isPreviousPageAvailable = isPreviousPageAvailable;
				scope.isNextPageAvailable = isNextPageAvailable;
				scope.goToThePreviousPage = goToThePreviousPage;
				scope.goToTheFirstPage = goToTheFirstPage;
				scope.goToTheNextPage = goToTheNextPage;
				scope.goToTheLastPage = goToTheLastPage;

				scope.selectRow = selectRow;
				scope.save = save;
				scope.edit = edit;
				scope.showEditor = showEditor;
				scope.remove = remove;

				scope.anySelectedRows = anySelectedRows;
				scope.isTextColumn = isTextColumn;
				scope.isNumberColumn = isNumberColumn;
				
				scope.columns = scope.options.columnsInfo.filter(function(c){
					return !c.hidden;
				});

				var defaultPaging = {
					page: 1,
					size: 5
				};

				var selectedRows = [];

				scope.paging = scope.options.defaults.paging || {};
				scope.paging.showAll = !scope.options.defaults.paging;
				scope.sorting = scope.options.defaults.sort || {};

				var defaultFilter = {};
				scope.columns.forEach(function(x){
					defaultFilter[x.name] = {
						type: x.type;
					};
				});

				scope.searchFilters = scope.options.defaults.filter || {

				};
				
				scope.$watch('searchFilters', function(){
					$timeout(function() {
						getRecords();
					}, 2000);
				}, true);

				scope.$watch('paging.showAll', function(){
					if(scope.records && !scope.paging.showAll){
						scope.paging.size = defaultPaging.size;
						scope.paging.page = defaultPaging.page;
					}

					if(scope.paging.showAll){
						scope.paging.page = null;
					}
				});

				scope.$watch('paging.page', function(){
					getRecords();
				});

				scope.$watch('paging.size', function(){
					scope.paging.page = 1;
					getRecords();
				});				

				function isPreviousPageAvailable(){
					return scope.paging.page > 1;
				}

				function isNextPageAvailable(){
					if(scope.records)
						return scope.records.pagesCount > scope.paging.page;

					return false;
				}

				function goToThePreviousPage(){
					scope.paging.page = scope.paging.page - 1;
				}

				function goToTheNextPage(){
					scope.paging.page = scope.paging.page + 1;
				}

				function goToTheFirstPage(){
					scope.paging.page = 1;
				}

				function goToTheLastPage(){
					if(scope.records)
						scope.paging.page = scope.records.pagesCount;

					return false;
				}

				function sort(name){
					if (scope.sorting.name === name){
						scope.sorting.direction = !scope.sorting.direction;
					} else {
						scope.sorting.name = name;
						scope.sorting.direction = true;						
					}
					var leaveOnFirstPage = scope.paging.page === 1;
					if(leaveOnFirstPage){
						getRecords();
						return;
					}
					scope.paging.page = 1;					
				}

				function getRecords(){
					scope.records = scope.options.actions.getRecords(scope.paging, 
									scope.searchFilters, scope.sorting);
				}

				function selectRow(record){
					record.selected = !record.selected;
					if(record.selected){
						selectedRows.push(record);
					} else {
						unselectRecord(record);
					}
				}

				function unselectRecord(record){
					var rowToDelete = selectedRows.filter(function(el){
						return el.id == record.id;
					})[0];
					var index = selectedRows.indexOf(rowToDelete);
						
					selectedRows.splice(index, 1);
				}

				function save(){
					scope.options.actions.saveRecords(scope.records);
				}

				function showEditor(){
					for(var i=0; i<selectedRows.length - 1; i++){
						unselectRecord(selectedRows[i]);
					}

					scope.editable = selectedRows[0];
					$('#editorPopUp').modal('show');
				}

				function edit(){
					scope.options.actions.editRecord(scope.editable);
					scope.editable.selected = false;
					getRecords();
					selectedRows = [];
					$('#editorPopUp').modal('hide');
				}

				function remove(){
					scope.options.actions.removeRecords(selectedRows);
					getRecords();
					selectedRows = [];
				}

				function anySelectedRows(){
					return !!selectedRows.length;
				}

				function isTextColumn(columnType){
					return columnType == 'text';
				}

				function isNumberColumn(columnType){
					return columnType == 'number';
				}
			}
		};
	}]);
})();