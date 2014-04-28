sgApp.controller('MapController', ['$scope', '$rootScope', '$element', 'map_overlay',

function ($scope, $rootScope, $element, map_overlay) {

  $scope.init = function() {
    $scope.price_limit = 15;
    $scope.cost = 0;
    $scope.time = 0;
    $scope.cost_per_second = 0.05;
    $scope.center = new google.maps.LatLng(39.896180710,32.779764533)
    $scope.map = new google.maps.Map($element.find(".map_canvas")[0], $scope.map_options());
    $scope.overlay = new map_overlay($scope.map, $element);
    $scope.overlay.setMap($scope.map);
    google.maps.event.addListener($scope.map, 'bounds_changed', $scope.redraw);
//    google.maps.event.addListener($scope.map, 'zoom_changed', $scope.redraw);
//    google.maps.event.addListener($scope.map, 'tilt_changed', $scope.redraw);
    google.maps.event.addListener($scope.map, 'center_changed', $scope.redraw);

    google.maps.event.addListener($scope.map, 'click', $scope.foo);

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

  $scope.foo = function(event) {
    var container = $scope.overlay.containers_data[0].geometry.coordinates;
    var distance = google.maps.geometry.spherical.computeDistanceBetween(event.latLng, new google.maps.LatLng(container[1], container[0]));
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
    return [];
  }

  $scope.init();
}]);
