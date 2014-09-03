worldCupApp.controller('currentPlayerCtrl', function ($rootScope, $scope, dataManager, $routeParams, $filter) {
	$rootScope.currSelection = "teams";
	dataManager.getData(function(data) {
		currTeam = ($filter('filter')(data.teams, { name: $routeParams.teamName})[0]);
		$scope.player = ($filter('filter')(currTeam.players, {shortName: $routeParams.playerName})[0]);;
	});
})