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
    $scope.timer = setInterval($scope.tick, 30);
  }

  $scope.stop_timer = function() {
    clearInterval($scope.timer);
  }

  $scope.tick = function() {
    $scope.time = parseInt((new Date() - $scope.start_time) / 1000.0 * $scope.speed_up);
    $scope.$apply();
    $rootScope.$broadcast('tick', $scope.time);
    $rootScope.$broadcast('speed', $scope.speed * $scope.speed_up);
  }

  $scope.init = function() {
    $scope.state = 'playing';
  }

  $scope.reset = function() {
    $scope.start_time =  new Date();
    $scope.speed = 50; // km/h
    $scope.state = 'paused';
    $scope.speed_up = 1.0;
    $scope.time = 0;
    $rootScope.$broadcast('initTimer');
  }

  $scope.reset();
}]);
