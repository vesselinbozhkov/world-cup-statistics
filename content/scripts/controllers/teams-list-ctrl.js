worldCupApp.controller('teamListCtrl', function ($scope, dataManager, $rootScope) {
	$rootScope.currSelection = "teams";
	dataManager.getData(function(data) {
		$scope.teams = data.teams;
	});
})