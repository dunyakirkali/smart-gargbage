sgApp.controller('TimeController', ['$scope',
function ($scope) {
  $scope.speed = 50; // km/h
  $scope.state = 'paused';


  $scope.play = function() {
    $scope.state = 'playing';
    $scope.start_timer();
  }
  $scope.pause = function() {
    $scope.state = 'paused';
    $scope.stop_timer();
  }

  $scope.start_timer = function() {
    $scope.start_time =  new Date();
    $scope.time = 0;
    $scope.timer = setInterval($scope.tick, 1000);
  }
  $scope.stop_timer = function() {
    clearInterval($scope.timer);
  }

  $scope.tick = function() {
    $scope.time = parseInt((new Date() - $scope.start_time) / 1000.0);
    $scope.$apply();
  }

}]);
