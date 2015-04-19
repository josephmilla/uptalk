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
  $scope.rooms = [];
  var ref = new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');
  var promise = angularFire(ref, $scope, "rooms");

  $scope.onRefresh = function() {
    var stop = $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
    }, 500);
  };
})

.controller('NewRoomCtrl', function($scope, $location, angularFire) {
  $scope.rooms = [];
  var ref = new Firebase('https://chatroom-io.firebaseio.com/opened_rooms');
  var promise = angularFire(ref, $scope, "rooms");

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
	$scope.baseArray = new Array("Do you like unicorns?","Don't tell me Santa Claus doesn't exist","Don't tell her. He is my boyfriend too!","I think it's the big belly. Everyone seems to want one.");
	$scope.replyArrays= new Array(new Array("How can you like things that don't exist? So No.","Ok, I tell your sister's boyfriend to tell you.","Ah, damn Santa Claus is a such a player","It also serves as a floatation device in case of an emergency"),new Array("Who doesn't like unicorns?","Santa doesn't exist, the tooth fairy doesn't exist, and the dinosaurs are dead. Time to face the hard facts.","You have been known to get around","So chubby chasers like to come after you eh?"), new Array("Yes, but don't tell anyone","He is still real in my heart","Who isn't dating him?","A little extra cushion for the pushing"));	
	$scope.right = 0;
	$scope.cur=0;
	$scope.newMessage = "";
	$scope.messages = [];
	$scope.username = 'User' + Math.floor(Math.random() * 501);
	
	for(var i=0; i<$scope.baseArray.length; i++){
		 $scope.messages.push({
			created_by: "mrBean",
			content: $scope.baseArray[i],
			created_at: new Date()
		});
		
		$scope.messages.push({
		   created_by: "mrHat",
		   content: $scope.replyArrays[$scope.cur][i],
		   created_at: new Date()
		});
	}
	
	$scope.nextConvo = function() {
		$scope.cur++;
		if($scope.cur>2){
			$scope.cur=0;
		}
		$scope.messages = [];
		for(var i=0; i<$scope.baseArray.length; i++){
			 $scope.messages.push({
				created_by: "mrBean",
				content: $scope.baseArray[i],
				created_at: new Date()
			});
			
			$scope.messages.push({
			   created_by: "mrHat",
			   content: $scope.replyArrays[$scope.cur][i],
			   created_at: new Date()
			});
		}
	};
   
	$scope.submitAns = function() {
		var correct = false;
		if(correct){
			document.getElementById("resultScreen").style.background="rgba(0,112,51,0.7)";
			document.getElementById("resultScreen").innerHTML = "<div class='res-text'>CORRECT</div>";
		}else{
			document.getElementById("resultScreen").style.background="rgba(112,5,5,0.7)";
			document.getElementById("resultScreen").innerHTML = "<div class='res-text'>WRONG</div>";

		}
	}

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

