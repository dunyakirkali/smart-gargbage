sgApp.controller('TimeController', ['$scope', '$rootScope', 
function ($scope, $rootScope) {
  $scope.play = function() {
    $scope.init();
    $scope.start_timer();
  }

  $scope.pause = function() {
    $scope.reset();
    $scope.stop_timer();
  }

  $scope.start_timer = function() {    
    $scope.timer = setInterval($scope.tick, 10);
  }

  $scope.stop_timer = function() {
    clearInterval($scope.timer);
  }

  $scope.tick = function() {
    $scope.time += 1.0 / 10.0 * $scope.speed_up;
    $scope.digit_1 = Math.floor($scope.time / 600) % 10;
    $scope.digit_2 = Math.floor($scope.time / 60) % 10;
    $scope.digit_3 = Math.floor($scope.time / 10) % 6;
    $scope.digit_4 = parseInt($scope.time) % 10;
    $scope.$apply();
    $rootScope.$broadcast('tick', $scope.time);
    $rootScope.$broadcast('speed', $scope.speed * $scope.speed_up);
  }

  $scope.init = function() {
    $scope.state = 'playing';
    $rootScope.$broadcast('init_time');
  }

  $scope.reset = function() {
    $scope.speed = 50; // km/h
    $scope.state = 'paused';
    $scope.speed_up = 1.0;
    $scope.time = 1;
    $scope.digit_1 = 0;
    $scope.digit_2 = 0;
    $scope.digit_3 = 0;
    $scope.digit_4 = 0;
    $rootScope.$broadcast('reset_time');
  }

  $scope.reset();
}]);
