worldCupApp.controller('refereeListCtrl', function ($scope, dataManager, $rootScope) {
	$rootScope.currSelection = "referees";
	dataManager.getData(function(data) {
		$scope.referees = data.referees;
	});
})