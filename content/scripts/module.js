var worldCupApp = angular.module('worldCupApp', ['ngRoute', 'ngAnimate']);

worldCupApp.config(function($routeProvider) {
	$routeProvider.
	when('/tournament', {
		templateUrl: 'partials/tournament.html',
		controller: 'tournamentCtrl'
	}).
	when('/knockout', {
		templateUrl: 'partials/tournament-knockout.html',
		controller: 'tournamentKnockoutCtrl'
	}).

	when('/stadiums', {
		templateUrl: 'partials/stadiums.html',
		controller: 'stadiumsListCtrl'
	}).
	when('/stadiums/:stadiumName', {
		templateUrl: 'partials/current-stadium.html',
		controller: 'currentStadiumCtrl'
	}).

	when('/teams', {
		templateUrl: 'partials/teams.html',
		controller: 'teamListCtrl'
	}).
	when('/teams/:teamName', {
		templateUrl: 'partials/current-team.html',
		controller: 'currentTeamCtrl'
	}).
	when('/teams/:teamName/:playerName', {
		templateUrl: 'partials/current-player.html',
		controller: 'currentPlayerCtrl'
	}).

	when('/matches', {
		templateUrl: 'partials/matches.html',
		controller: 'matchesListCtrl'
	}).
	when('/matches/:matchInfo', {
		templateUrl: 'partials/current-match.html',
		controller: 'currentMatchCtrl'
	}).

	when('/referees', {
		templateUrl: 'partials/referees.html',
		controller: 'refereeListCtrl'
	}).
	when('/referees/:refereeName', {
		templateUrl: 'partials/current-referee.html',
		controller: 'currentRefereeCtrl'
	}).

	when('/statistics', {
		templateUrl: 'partials/statistics.html',
		controller: 'statisticsCtrl'
	}).

	otherwise ({
		redirectTo: '/tournament'
	});

	// $locationProvider.html5mode(true);
})


worldCupApp.factory('dataManager', function($http){

	function getData(callback){
	  $http({
	    method: 'GET',
	    url: '../db/db.json',
	    cache: true
	  }).success(callback);
	}

	return {
	  getData: getData,
	};
});