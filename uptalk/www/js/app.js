angular.module('chatRoom', ['ionic', 'ngRoute', 'ngAnimate', 'chatRoom.services', 'chatRoom.controllers', 'firebase', 'highcharts-ng'])

.config(function ($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'MainCtrl'
  });

  $routeProvider.when('/rooms/new', {
    templateUrl: 'templates/new_room.html',
    controller: 'NewRoomCtrl'
  });

  $routeProvider.when('/rooms/:roomId', {
    templateUrl: 'templates/room.html',
    controller: 'RoomCtrl'
  });

  $routeProvider.when('/challenge', {
    templateUrl: 'templates/challenge.html',
    controller: 'ChallengeCtrl'
  });

  $routeProvider.when('/statistics', {
    templateUrl: 'templates/statistics.html',
    controller: 'StatisticsCtrl'
  });

  $routeProvider.when('/about', {
    templateUrl: 'templates/about.html',
    controller: 'AboutCtrl'
  });

  $routeProvider.when('/chatstats1', {
    templateUrl: 'templates/chatstats1.html',
    controller: 'ChatStats1Ctrl'
  });

  $routeProvider.when('/chatstats2', {
    templateUrl: 'templates/chatstats2.html',
    controller: 'ChatStats2Ctrl'
  });

  $routeProvider.otherwise({
    redirectTo: '/home'
  });

});
