worldCupApp.controller('stadiumsListCtrl', function ($scope, dataManager, $rootScope) {
	$rootScope.currSelection = "stadiums";
	dataManager.getData(function(data) {
		$scope.stadiums = data.stadiums;
	});
})