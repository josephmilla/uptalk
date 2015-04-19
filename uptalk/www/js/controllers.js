angular.module('chatRoom.controllers', [])

.controller('AppCtrl', function($scope, $location) {
  $scope.goToNewRoom = function() {
    $location.path('/rooms/new');
    $scope.toggleSideMenu();
  };

  $scope.goToNewRoomPlus = function() {
    $location.path('/rooms/new');
  }

  $scope.goToAbout = function() {
    $location.path('/about');
    $scope.toggleSideMenu();
  };

  $scope.goToHome = function() {
    $location.path('/home');
    $scope.toggleSideMenu();
  };

  $scope.goToChallenge = function() {
    $location.path('/challenge');
    $scope.toggleSideMenu();
  };

  $scope.goToStatistics = function() {
    $location.path('/statistics');
    $scope.toggleSideMenu();
  };

  $scope.toggleSideMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };
})

.controller('MainCtrl', function($scope, $timeout, angularFire) {
  $scope.rooms = [
    {
      'id' : '0000001',
      'title' : 'Room1',
      'description' : 'This is Room1'
    },
    {
      'id' : '0000002',
      'title' : 'Room1',
      'description' : 'This is Room2'
    },
    {
      'id' : '0000003',
      'title' : 'Room1',
      'description' : 'This is Room3'
    },
    {
      'id' : '0000004',
      'title' : 'Room1',
      'description' : 'This is Room4'
    },
    {
      'id' : '0000005',
      'title' : 'Room1',
      'description' : 'This is Room5'
    },
  ];
  // var ref = new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');
  // var promise = angularFire(ref, $scope, "rooms");

  $scope.onRefresh = function() {
    var stop = $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  };
})

.controller('NewRoomCtrl', function($scope, $location, angularFire) {
  $scope.rooms = [
    {
      'id' : '0000001',
      'title' : 'Room1',
      'description' : 'This is Room1'
    },
    {
      'id' : '0000002',
      'title' : 'Room1',
      'description' : 'This is Room2'
    },
    {
      'id' : '0000003',
      'title' : 'Room1',
      'description' : 'This is Room3'
    },
    {
      'id' : '0000004',
      'title' : 'Room1',
      'description' : 'This is Room4'
    },
    {
      'id' : '0000005',
      'title' : 'Room1',
      'description' : 'This is Room5'
    },
  ];
  
  // $scope.rooms = [];
  // var ref = new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');
  // var promise = angularFire(ref, $scope, "rooms");

  $scope.newRoomName = "";
  $scope.newRoomNameId = "";
  $scope.newRoomDescription = "";

  $scope.setNewRoomNameId = function() {
    this.newRoomNameId = this.newRoomName.toLowerCase().replace(/\s/g,"-").replace(/[^a-z0-9\-]/g, '');
  };

  $scope.createRoom = function() {
    $scope.rooms.push({
      id: Math.floor(Math.random() * 5000001),
      title: $scope.newRoomName,
      slug: $scope.newRoomNameId,
      description: $scope.newRoomDescription
    });

    $location.path('/home');
  };

  // $scope.onRefresh = function() {
  //   var stop = $timeout(function() {
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }, 500);
  // };
})

.controller('RoomCtrl', function($scope, $routeParams, $timeout, angularFire) {
  $scope.newMessage = "";
  $scope.messages = [];

  var ref = new Firebase('https://chatroom-io.firebaseio.com/rooms/' + $routeParams.roomId);
  var promise = angularFire(ref, $scope, "messages");

  $scope.username = 'User' + Math.floor(Math.random() * 501);
  $scope.submitAddMessage = function() {
    $scope.messages.push({
      created_by: this.username,
      content: this.newMessage,
      created_at: new Date()
    });
    this.newMessage = "";
  };

  $scope.onRefresh = function() {
    var stop = $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  };
})

.controller('ChallengeCtrl', function($scope) {

  // $scope.onRefresh = function() {
  //   var stop = $timeout(function() {
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }, 500);
  // };
})

.controller('StatisticsCtrl', function($scope) {

  // $scope.onRefresh = function() {
  //   var stop = $timeout(function() {
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }, 500);
  // };
})

.controller('AboutCtrl', function($scope) {

  // $scope.onRefresh = function() {
  //   var stop = $timeout(function() {
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }, 500);
  // };
});
