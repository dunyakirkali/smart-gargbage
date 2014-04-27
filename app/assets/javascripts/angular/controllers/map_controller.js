sgApp.controller('MapController', ['$scope', '$rootScope', '$element', 'map_overlay',

function ($scope, $rootScope, $element, map_overlay) {

  $scope.init = function() {
    $scope.path;
    $scope.containers;
    $scope.price_limit = 50;
    $scope.cost_per_second = 0.134;
    $scope.center = new google.maps.LatLng(39.896180710,32.779764533)
    $scope.map = new google.maps.Map($element.find(".map_canvas")[0], $scope.map_options());
    $scope.overlay = new map_overlay($scope.map, $element);
    $scope.overlay.setMap($scope.map);
    google.maps.event.addListener($scope.map, 'bounds_changed', $scope.redraw);
    google.maps.Map.prototype.getMapScale = function () {
      var circumference = 40075040, zoom, lat, scale;
      zoom = this.getZoom();
      lat = this.getCenter().lat();
      scale = (circumference * Math.cos(lat) / Math.pow(2, zoom + 8));
      return scale;
    }

    // Angularjs events
    var that = this;
    $rootScope.$on('tick', function (event, data) {
      if(!$scope.complete) {
        $scope.time = data;
        $scope.cost = $scope.time * $scope.cost_per_second;
        if($scope.cost > $scope.price_limit) {
          $scope.alert_state = 'alert';
        }
  	if ($scope.overlay.completed) {
          that.complete = true;
        }
        $scope.$apply();
        $scope.overlay.setTime(data);
      }
    });

    $rootScope.$on('speed', function (event, data) {
      $scope.overlay.setSpeed(data);
    });

    $rootScope.$on('init_time', function (event) {
      console.log(that, 'init');
      $scope.complete = false;
    });

    $rootScope.$on('reset_time', function (event) {
      console.log('reset_time');
      $scope.cost = 0;
      $scope.alert_state = '';
      $scope.time = 0;
      $scope.overlay.reset();
    });
  }

  $scope.redraw = function() {
    $scope.overlay.draw();
  }

  $scope.map_options = function() {
    return {
      zoom: 14,
      center: $scope.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: $scope.map_style(),
      mapTypeControl: true,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      zoomControl: false
    };
  }

  $scope.map_style = function() {
    return [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}];
  }

  $scope.init();
}]);
