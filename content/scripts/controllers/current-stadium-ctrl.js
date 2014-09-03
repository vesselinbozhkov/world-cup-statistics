worldCupApp.controller('currentStadiumCtrl', function ($scope, $routeParams, dataManager, $rootScope) {
	$rootScope.currSelection = "stadiums";
	dataManager.getData(function(data) {
		$scope.stadiumFromRoute = $routeParams.stadiumName;
		var currStadium = getCurrentInfo();
		$scope.stadium = currStadium;

		var mapOptions = {
		    zoom: 15,
		    mapTypeId: google.maps.MapTypeId.SATELLITE,
		    center: new google.maps.LatLng(currStadium.coordinates.latitude, currStadium.coordinates.longitude)
	  	};

	  	var map = new google.maps.Map(document.getElementById('map-holder'), mapOptions);

		function getCurrentInfo() {
			var len = data.stadiums.length;
			for (var i = 0; i < len; i++) {
				if (data.stadiums[i].name === $routeParams.stadiumName) {
					return data.stadiums[i];
				};
			};
		}
	});
})