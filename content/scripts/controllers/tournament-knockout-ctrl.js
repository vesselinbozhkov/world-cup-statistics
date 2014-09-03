worldCupApp.controller('tournamentKnockoutCtrl', function ($scope, dataManager, $filter, $rootScope) {
	$rootScope.currSelection = "knockout";
	dataManager.getData(function(data) {
		$scope.roundOf16 = $filter('filter')(data.matches, {stage: 'Round Of 16'});
		$scope.roundOf8 = $filter('filter')(data.matches, {stage: 'Quarterfinals'});
		$scope.roundOf4 = $filter('filter')(data.matches, {stage: 'Semifinals'});
		$scope.thirdPlaceMatch = ($filter('filter')(data.matches, {stage: 'Third Place'})[0]);
		$scope.grandeFinale = ($filter('filter')(data.matches, {stage: 'Final'}, true)[0]);
	})
})