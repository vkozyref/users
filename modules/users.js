(function(){
	angular.module('users', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			  $routeProvider
				  .when('/', {
			        templateUrl: 'views/users.html',
			        controller: 'userListController'
			      })
			      .otherwise({
			        redirectTo: '/'
			      });			
		}]);
})();