worldCupApp.controller('tournamentCtrl', function ($rootScope, $scope, dataManager, $filter) {
	$rootScope.currSelection = "tournament";
	dataManager.getData(function(data) {
			var firstGroups = ['A', 'B', 'C', 'D'];
			var secondGroups = ['E', 'F', 'G', 'H'];
			var group = {};
				group.firstHalf = [];
				group.secondHalf = [];
				results = [];

			for (var i = 0; i < firstGroups.length; i++) {
				resultsInGroup = {};
				resultsInGroup.orderedResultsFirstSide = [];
		     	resultsInGroup.orderedResultsSecondSide = [];
				var groupFromFirst = $filter('filter')(data.teams, {group:firstGroups[i]});

				var sortedGroupFromFirst = $filter('orderBy')(groupFromFirst, 'groupRank');
				
				var matchesFromFirst = $filter('filter')(data.matches, {group:firstGroups[i]});
				calculateGroupResults(matchesFromFirst);

				results.push(resultsInGroup);
				group.firstHalf.push(sortedGroupFromFirst);
			};

			for (var i = 0; i < secondGroups.length; i++) {
				resultsInGroup = {};
				resultsInGroup.orderedResultsFirstSide = [];
		     	resultsInGroup.orderedResultsSecondSide = [];
				var groupFromSecond = $filter('filter')(data.teams, {group:secondGroups[i]});
				var sortedGroupFromSecond = $filter('orderBy')(groupFromSecond, 'groupRank');
				var matchesFromSecond = $filter('filter')(data.matches, {group:secondGroups[i]});
				calculateGroupResults(matchesFromSecond);
				
				results.push(resultsInGroup);
				group.secondHalf.push(sortedGroupFromSecond);

			};
			$scope.groups = group;
			$scope.activeGroup = group.firstHalf[0];
			$scope.activeResults = results[0];

			$scope.activateGroup = function(currGroup, currGroupIndex) {
				$scope.activeGroup = currGroup;
				$scope.activeResults = results[currGroupIndex];
				$scope.selectedIndex = currGroupIndex;
			}

		    

			function calculateGroupResults(matches) {
				var orderedResultsPatternFirstSide = ['1v2', '1v3', '1v4', '2v3', '2v4', '3v4'];
				var orderedResultsPatternSecondSide = ['2v1', '3v1', '4v1', '3v2', '4v2', '4v3'];
				for (var i = 0; i < matches.length; i++) {
					for (var j = 0; j < orderedResultsPatternFirstSide.length; j++) {
						if (matches[i].rezultIndex === orderedResultsPatternFirstSide[j]) {
							resultsInGroup.orderedResultsFirstSide[j] = matches[i].homeTeam.goals + ':' + matches[i].awayTeam.goals;
							resultsInGroup.orderedResultsSecondSide[j] = matches[i].awayTeam.goals + ':' + matches[i].homeTeam.goals;
						};
						if (matches[i].rezultIndex === orderedResultsPatternSecondSide[j]) {
							resultsInGroup.orderedResultsSecondSide[j] = matches[i].homeTeam.goals + ':' + matches[i].awayTeam.goals;
							resultsInGroup.orderedResultsFirstSide[j] = matches[i].awayTeam.goals + ':' + matches[i].homeTeam.goals;
						};
					};
				};
			};
	});
})