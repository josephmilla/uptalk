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

  $scope.goToChatbot = function() {
    $location.path('/chatbot');
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
<<<<<<< HEAD
  $scope.rooms = [];
  var ref = new Firebase('https://yo4mv38loui.firebaseio-demo.com/');//new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');
  var promise = angularFire(ref, $scope, "rooms");
=======
  $scope.rooms = [
    {
      'id' : '0000001',
      'title' : 'Room1',
      'description' : 'This is Room1',
      'messages' : {
        'username' : 'user1',
        'content' : 'This is a content',
        'date' : '1429426288'
      }
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
>>>>>>> deb86b554572e714fb0a7c6b695343692432290f

  $scope.onRefresh = function() {
    var stop = $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  };
})

.controller('NewRoomCtrl', function($scope, $location, angularFire) {
<<<<<<< HEAD
  $scope.rooms = [];
  var ref = new Firebase('https://yo4mv38loui.firebaseio-demo.com/');//new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');
  var promise = angularFire(ref, $scope, "rooms");
=======
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
>>>>>>> deb86b554572e714fb0a7c6b695343692432290f

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

  var ref = new Firebase('https://yo4mv38loui.firebaseio-demo.com/');//new Firebase('https://chatroom-io.firebaseio.com/rooms/' + $routeParams.roomId);
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

.controller('ChatbotCtrl', function($scope) {

  // $scope.onRefresh = function() {
  //   var stop = $timeout(function() {
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }, 500);
  // };
})

.controller('ChallengeCtrl', function($scope) {
	
	
	$scope.newMessage = "";
	$scope.messages = [];
	$scope.username = 'User' + Math.floor(Math.random() * 501);
	
	
    $scope.messages.push({
      created_by: "mrBean",
      content: "Do you like unicorns?",
      created_at: new Date()
    });
	
	$scope.messages.push({
      created_by: "mrHat",
      content: "Yes, but don't tell anyone",
      created_at: new Date()
    });
  
	
	
	
  // $scope.onRefresh = function() {
  //   var stop = $timeout(function() {
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }, 500);
  // };
})

.controller('StatisticsCtrl', function($scope) {

$scope.chartConfig = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Breakdown of grammartical issues'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Grammartical issue share',
            data: [
                ['Spelling',   12.0],
                ['Word choice',       26.8],
                {
                    name: 'Sentence fragments',
                    y: 45.8,
                    sliced: true,
                    selected: true
                },
                ['Pronoun Reference',    8.5],
                ['Comma Splices',     6.2],
                ['Others',   0.7]
            ]
        }]
    }

/**click : function(d) {
  $scope.messages.push('clicked!');
},
mouseover : function(d) {
  $scope.messages.push('mouseover!');
},
mouseout : function(d) {
  $scope.messages.push('mouseout!');
}**/

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
})



.controller('ChatStats1Ctrl', function($scope) {
      
$scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [['Hello', 10],['Thank you', 15], ['Ok', 12], ['Great!' , 8], ['Awesome', 7]]
        }],
        title: {
            text: 'Non conjuntive word most frequently used'
        },

        loading: false
    }
  // $scope.onRefresh = function() {
  //   var stop = $timeout(function() {
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }, 500);
  // };
})




.controller('ChatStats2Ctrl', function($scope) {

$scope.chartConfig = {
        options: {
            chart: {
                type: 'bar'
            }
        },
        series: [{
            data: [10, 15, 12, 8, 7]
        }],
        title: {
            text: 'Hello'
        },

        loading: false
    }

     $scope.chartConfig2 = {
         options: {
            chart: {
                type: 'areaspline'
            }
        },
        title: {
            text: 'Average correct answers during one week'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ],
            plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]
        },
        yAxis: {
            title: {
                text: 'Number of correct answers'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'John',
            data: [3, 4, 3, 5, 4, 10, 12]
        }, {
            name: 'Jane',
            data: [1, 3, 4, 3, 3, 5, 4]
        }]
    }

  // $scope.onRefresh = function() {
  //   var stop = $timeout(function() {
  //     $scope.$broadcast('scroll.refreshComplete');
  //   }, 500);
  // };
});

