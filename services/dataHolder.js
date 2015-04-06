(function(){
	angular.module('users').factory('dataHolder', ['$filter', function($filter){
		var service = {
			getUsers: getUsers,
			saveUsers: saveUsers,
			editUser: editUser,
			removeUsers: removeUsers
		};

		var records = [
			{
				id: 1,
				firstName: 'Alex',
				secondName: 'Lutjen',
				email: 'alex.lutjen@mail.com',
				age:35
			},
			{
				id: 2,
				firstName: 'Jon',
				secondName: 'Hurd',
				email: 'jon.hurd@mail.com',
				age:51
			},
			{
				id: 3,
				firstName: 'Krzysztof',
				secondName: 'Wasiak',
				email: 'krzysztof.wasiak@mail.com',
				age:36
			},
			{
				id: 4,
				firstName: 'Chris',
				secondName: 'Lowe',
				email: 'chris.lowe@mail.com',
				age:40
			},
			{
				id: 5,
				firstName: 'Paul',
				secondName: 'Bourke',
				email: 'paul.bourke@mail.com',
				age:27
			},
			{
				id: 6,
				firstName: 'Mateusz',
				secondName: 'Moska',
				email: 'mateusz.moska@mail.com',
				age:28
			},
			{
				id: 7,
				firstName: 'Justin',
				secondName: 'Connell',
				email: 'justin.connell@mail.com',
				age:42
			},
			{
				id: 8,
				firstName: 'Ron',
				secondName: 'Shteinberg',
				email: 'ron.shteinberg@mail.com',
				age:36
			},
			{
				id: 9,
				firstName: 'Dmitriy',
				secondName: 'Solovyov',
				email: 'dmitriy.solovyov@mail.com',
				age:37
			},
			{
				id: 10,
				firstName: 'Kevin',
				secondName: 'Burt',
				email: 'kevin.burt@mail.com',
				age:41
			},
			{
				id: 11,
				firstName: 'JP',
				secondName: 'Newman',
				email: 'jp.newman@mail.com',
				age:43
			},
			{
				id: 12,
				firstName: 'Huy',
				secondName: 'Le',
				email: 'huy.le@mail.com',
				age:45
			},
			{
				id: 13,
				firstName: 'Vitaliy',
				secondName: 'Khmelko',
				email: 'vitaliy.khmelko@mail.com',
				age:30
			}
		];

		function getUsers(pagingInfo, filters, sorting){
			var result = [];
			
			result = records.filter(function(x){
				return search(x, filters);
			});

			result = sort(result, sorting);

			result = setPaging(pagingInfo, result);			

			return result;
		}

		function sort(list, criteria){
			if(criteria.name){
				var sortExpression = criteria.direction ? '+' : '-';
				sortExpression += criteria.name;
				return $filter('orderBy')(list, sortExpression);
			}

			return list;
		}

		function setPaging(pagingInfo, result){
			if(!pagingInfo.showAll){
				var totalSize = result.length;
				var startIndex = pagingInfo.size * (pagingInfo.page - 1);
				var finishIndex = totalSize - startIndex < parseInt(pagingInfo.size) ?
					totalSize : startIndex + parseInt(pagingInfo.size);
				result = (totalSize == finishIndex) ? result.slice(startIndex)
					: result.slice(startIndex, finishIndex);
				result.pagesCount = totalSize % pagingInfo.size == 0 ? totalSize / pagingInfo.size
					: parseInt(totalSize / pagingInfo.size) + 1;
			}			

			return result;
		}

		function search(item, filters){
			var searchKeys = Object.keys(filters);
			for(var key in searchKeys){
				if(filters[searchKeys[key]] && filters[searchKeys[key]].value){
					if(filters[searchKeys[key]].type == 'text' 
						&& item[searchKeys[key]].toLowerCase().indexOf(filters[searchKeys[key]].value.toLowerCase()) < 0){
							return false;
					}
					if(filters[searchKeys[key]].type == 'number'
						&& ((filters[searchKeys[key]].value.from && item[searchKeys[key]] < parseInt(filters[searchKeys[key]].value.from))
							|| (filters[searchKeys[key]].value.to && item[searchKeys[key]] > parseInt(filters[searchKeys[key]].value.to)))){
								return false;
					}
				}
				
			}
			return true
		}

		function saveUsers(users){
			for(var i=0; i < users.length; i++){
				editUser(users[i]);
			}
		}

		function editUser(user){
			var editableUser = records.filter(function(x){
					return x.id == user.id;
				})[0];
				editableUser.firstName = user.firstName;
				editableUser.secondName = user.secondName;
				editableUser.email = user.email;
				editableUser.age = user.age;
		}

		function removeUsers(users){
			for(var i=0; i < users.length; i++){
				var user = records.filter(function(x){
					return x.id == users[i].id;
				})[0];
				var index = records.indexOf(user);
				records.splice(index, 1);
			}
		}

		return service;
	}]);
})();