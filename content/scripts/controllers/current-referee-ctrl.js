worldCupApp.controller('currentRefereeCtrl', function ($scope, $routeParams, dataManager, $rootScope) {
	$rootScope.currSelection = "referees";
	dataManager.getData(function(data) {
		$scope.refereeFromRoute = $routeParams.refereeName;
		var currReferee = getCurrentData();
		$scope.referee = currReferee;
		$scope.photo = currReferee.role == 'referee' ? currReferee.name : 'no-photo';
		function getCurrentData() {
			var len = data.referees.length;
			for (var i = 0; i < len; i += 1) {
				if (data.referees[i].name === $routeParams.refereeName) {
					return data.referees[i];
				};
			};
		};
	});
})