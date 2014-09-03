worldCupApp.controller('statisticsCtrl', function ($scope, dataManager, $filter, $rootScope) {
	$rootScope.currSelection = "statistics";
	dataManager.getData(function(data) {
		var canvasModel = document.createElement("canvas");
			canvasModel.setAttribute("id", "graphic-container");
			canvasModel.setAttribute("width", "823");
			canvasModel.setAttribute("height", "400");
		var canvasContainer = document.getElementById("canvas-container");


		var basicOptions = ["All teams", "Specific team", "Players", "Stadiums"];
		var allTeamsOptions = [ "Average age", "Average Height", "Average Weight", "Wins", "Draws", "Losses", "Goals scored", "Goals conceded", "Average scored", "Average conceded"];
		var specificTeamNames = getTeamsNames();
		var specificTeamOptions = ["Goals", "Assists", "Height", "Weight", "Age"];
		var playersOptions = ["Goals scored", "Assists", "Tallest", "Shortest", "Oldest", "Youngest"];
		var stadiumsOptions = ["Capacity"];
		var diagramsOptions = ["bar", "line", "radar"];

		$scope.basicOptions = basicOptions;
		$scope.specificTeamOptions = specificTeamOptions;
		$scope.diagramsOptions = diagramsOptions;	

		$scope.secondOptionHeader = "Option:";
		teamCalculation("age", true);
		$scope.basicOption = basicOptions[0];
		$scope.secondOptions = allTeamsOptions;
		$scope.secondOption = $scope.secondOptions[0];
		$scope.diagramOption = diagramsOptions[1];
		$scope.showSecondOptions = function() {
			$scope.showThird = false;
			$scope.secondOptionHeader = "Option:";
			if ($scope.basicOption === "All teams") {
				$scope.secondOptions = allTeamsOptions;
			}
			if ($scope.basicOption === "Specific team") {
				$scope.secondOptions = specificTeamNames;
				$scope.showThird = true;
				$scope.secondOptionHeader = "Country:";
			}
			if ($scope.basicOption === "Players") {
				$scope.secondOptions = playersOptions;
			}
			if ($scope.basicOption === "Stadiums") {
				$scope.secondOptions = stadiumsOptions;
			}
			if ($scope.basicOption === "Matches") {
				$scope.secondOptions = matchesOptions;
			}
		}
		$scope.showGraph = function() {
			if ($scope.basicOption === "All teams") {
				switch($scope.secondOption) {
					case "Average age":
							teamCalculation("age", true, $scope.diagramOption);
						break;
					case "Average Height":
							teamCalculation("height", true, $scope.diagramOption);
						break;
					case "Average Weight":
							teamCalculation("weight", true, $scope.diagramOption);
						break;
					case "Wins":
							teamCalculation("wins", false, $scope.diagramOption);
						break;
					case "Draws":
							teamCalculation("draws", false, $scope.diagramOption);
						break;
					case "Losses":
							teamCalculation("losses", false, $scope.diagramOption);
						break;
					case "Goals scored":
							teamCalculation("goalsScored", false, $scope.diagramOption);
						break;
					case "Goals conceded":
							teamCalculation("goalsConceded", false, $scope.diagramOption);
						break;
					case "Average scored":
							teamCalculation("goalsScored", false, $scope.diagramOption, true);
						break;
					case "Average conceded":
							teamCalculation("goalsConceded", false, $scope.diagramOption, true);
						break;
					case "Average conceded":
						teamCalculation("goalsConceded", false, $scope.diagramOption, true);
					break;	
				}			
			};
			if ($scope.basicOption === "Specific team") {
				switch($scope.thirdOption) {
					case "Goals":
							specificTeamCalculation($scope.secondOption, "goals", $scope.diagramOption);
						break;
					case "Assists":
							specificTeamCalculation($scope.secondOption, "assists", $scope.diagramOption);
						break;
					case "Height":
							specificTeamCalculation($scope.secondOption, "height", $scope.diagramOption);
						break;
					case "Weight":
							specificTeamCalculation($scope.secondOption, "weight", $scope.diagramOption);
						break;
					case "Age":
						specificTeamCalculation($scope.secondOption, "age", $scope.diagramOption);
					break;
				}
			};
			if ($scope.basicOption === "Players") {
				switch($scope.secondOption) {
					case "Goals scored":
							playersCalculation("goals", $scope.diagramOption, true);
						break;
					case "Assists":
							playersCalculation("assists", $scope.diagramOption, true);
						break;
					case "Tallest":
							playersCalculation("height", $scope.diagramOption, true);
						break;
					case "Shortest":
							playersCalculation("height", $scope.diagramOption, false);
						break;
					case "Oldest":
							playersCalculation("age", $scope.diagramOption, true);
						break;
					case "Youngest":
							playersCalculation("age", $scope.diagramOption, false);
						break;

				}
			};
			if ($scope.basicOption === "Stadiums") {
				switch($scope.secondOption) {
					case "Capacity":
							stadiumsCalculation("capacity", $scope.diagramOption, true);
						break;
				}
			};
		}

		function getTeamsNames() {
			var names = [];
			for (var i = 0; i < data.teams.length; i++) {
				names[i] = data.teams[i].name;
			};
			return names;
		}

		function changeGraph(newData, type) {
			var graphData = {
			    labels: [],
			    datasets: [
			        {
			            label: "",
			            fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,220,0.75)",
			            highlightStroke: "rgba(100,100,100,1)",
			            data: []
			        }
			    ]
			};
			for (var i = 0; i < newData.length; i++) {
				graphData.datasets[0].data.push(newData[i].value);
				graphData.labels.push(newData[i].name);
			};
			// recreating canvas (chartJs cannot redraw the graph in the same canvas (they are working on fix))
			angular.element(document.getElementById("graphic-container")).remove();
			var newCanvas = canvasModel.cloneNode(true);
			canvasContainer.appendChild(newCanvas);

			var canvasEl = document.getElementById("graphic-container");
			var ctx = canvasEl.getContext("2d");

			if (type === "bar") {
				var newChart = new Chart(ctx).Bar(graphData);
			}
			else if (type === "line") {
				var newChart = new Chart(ctx).Line(graphData);
			}
			else if (type === "radar") {
				var newChart = new Chart(ctx).Radar(graphData);
			}
			else {
				var newChart = new Chart(ctx).Line(graphData);
			}
		}

		function teamCalculation(criterion, byPlayers, type, averageByMatch) {
			var averageData = [];
			for (var i = 0; i < data.teams.length; i++) {
				var currTeam = {};
				currTeam.name = data.teams[i].name;
				if (byPlayers) {
					averageValue = getAverageByPlayers(data.teams[i], criterion);
				}
				else {
					if (averageByMatch) {
						averageValue = parseInt(data.teams[i][criterion]);
						averageValue /= parseInt(data.teams[i].matchesPlayed);
						averageValue = averageValue.toFixed(2);
					}
					else {
						averageValue = parseInt(data.teams[i][criterion]);
					}
				}
				currTeam.value = averageValue;
				averageData.push(currTeam);
			};
			var sortedAverageData = $filter('orderBy')(averageData, 'value', false);
			changeGraph(sortedAverageData, type);


			function getAverageByPlayers(team, criterion) {
				var averageValue = 0;
				var devider = 0;
				for (var j = 0; j < team.players.length; j++) {
					if (team.players[j][criterion]) {
						devider++;
						averageValue += parseInt(team.players[j][criterion]);
					};
				};
				averageValue /= devider;
				return averageValue.toFixed(2);
			}
		}

		function specificTeamCalculation(team, criterion, type) {
			var team = ($filter('filter')(data.teams, {name:team})[0]);
			var dataToPass = []; 
			for (var i = 0; i < team.players.length; i++) {
				if (team.players[i][criterion]) {
					var currPlayer = {};
					currPlayer.name = team.players[i].shortName;
					currPlayer.value = team.players[i][criterion];
					dataToPass.push(currPlayer);					
				};
			};
			var sortedData = $filter('orderBy')(dataToPass, 'value', false);
			changeGraph(sortedData, type);
		}

		function playersCalculation(criterion, type, ascending) {
			var dataToPass = [];
			for (var i = 0; i < data.teams.length; i++) {
				for (var j = 0; j < data.teams[i].players.length; j++) {
					var teamShortName = (data.teams[i].name.substring(0, 3)).toUpperCase();
					if (data.teams[i].players[j][criterion]) {
						var currPlayer = {};
						currPlayer.name = data.teams[i].players[j].shortName + ' (' + teamShortName + ')';
						currPlayer.value = data.teams[i].players[j][criterion];
						dataToPass.push(currPlayer);
					}; 
				};
			};
			var sortedData = $filter('orderBy')(dataToPass, 'value', ascending);
			sortedData = sortedData.slice(0, 30);
			changeGraph(sortedData, type);
		}

		function stadiumsCalculation(criterion, type) {
			var dataToPass = [];
			for (var i = 0; i < data.stadiums.length; i++) {
				if (data.stadiums[i][criterion]) {
					var currStadium = {};
					currStadium.name = data.stadiums[i].name;
					currStadium.value = data.stadiums[i][criterion];
					dataToPass.push(currStadium);
				};
			};
			var sortedData = $filter('orderBy')(dataToPass, 'value', false);
			changeGraph(sortedData, type);
		}


	});
})
