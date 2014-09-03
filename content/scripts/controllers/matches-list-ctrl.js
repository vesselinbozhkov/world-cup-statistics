worldCupApp.controller('matchesListCtrl', function ($scope, dataManager, $filter, $rootScope) {
	$rootScope.currSelection = "matches";
	dataManager.getData(function(data) {
			var sortedMatches = $filter('orderBy')(data.matches, 'date');
			$scope.matches = sortedMatches;
	});
})