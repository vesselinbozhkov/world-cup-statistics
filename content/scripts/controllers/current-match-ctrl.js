worldCupApp.controller('currentMatchCtrl', function ($rootScope, $scope, dataManager, $routeParams, $filter) {
	$rootScope.currSelection = "matches";
	dataManager.getData(function(data) {
		var infoFromURL = $routeParams.matchInfo.split('+');
		var matchId = infoFromURL[2];
		var currMatch = ($filter('filter')(data.matches, {id : matchId})[0]);
		$scope.match = currMatch;
		if (currMatch.homeTeam.goals === currMatch.awayTeam.goals) {
			$scope.homeColor = "yellow";
			$scope.awayColor = "yellow";
		}
		else if (currMatch.homeTeam.goals > currMatch.awayTeam.goals) {
			$scope.homeColor = "green";
			$scope.awayColor = "red";	
		}
		else {
			$scope.homeColor = "red";
			$scope.awayColor = "green";	
		};
	});
})