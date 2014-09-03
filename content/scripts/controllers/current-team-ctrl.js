worldCupApp.controller('currentTeamCtrl', function ($scope, dataManager, $routeParams, $filter, $rootScope) {
	$rootScope.currSelection = "teams";
	dataManager.getData(function(data) {
		$scope.team = ($filter('filter')(data.teams, {name : $routeParams.teamName})[0]);
	});
})