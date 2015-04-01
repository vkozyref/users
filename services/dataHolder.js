(function(){
	angular.module('users').factory('dataHolder', function(){
		var service = {
			getUsers: getUsers
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

		function getUsers(pagingInfo, filter){
			return records;
		}

		return service;
	});
})();