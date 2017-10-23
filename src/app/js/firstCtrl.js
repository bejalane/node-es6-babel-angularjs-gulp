app.controller("firstCtrl", ['$scope', '$http', function($scope, $http){
	$scope.title = "Gulp";

	$http.get('/technologies').then(
		function(res){
			console.log(res);
			$scope.technologies = res.data;
		},
		function(err){
			console.log(err);
		}
	)
}]);