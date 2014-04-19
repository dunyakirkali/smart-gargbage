sgApp.controller('MapController', ['$scope', '$element', 'map_overlay',
function ($scope, $element, map_overlay) {

  $scope.path;
  $scope.containers;
  $scope.cost = 0;

  $scope.init = function() {
    $scope.center = new google.maps.LatLng(39.89139, 32.78472)
    $scope.map_options = {
      zoom: 11,
      center: $scope.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: $scope.map_style()
    }
    $scope.map = new google.maps.Map($element.find(".map_canvas")[0], $scope.map_options);
    $scope.overlay = new map_overlay($scope.map);
    $scope.overlay.setMap($scope.map);

//    var ctaLayer = new google.maps.KmlLayer({
//      url: "https://maps.google.com/maps/ms?authuser=0&vps=2&ie=UTF8&msa=0&output=kml&msid=216545768027274207201.0004f76932199a0f4378d"
//    });
//    ctaLayer.setMap($scope.map);
  }


  $scope.map_style = function() {
    return [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#b5cbe4"}]},{"featureType":"landscape","stylers":[{"color":"#efefef"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#83a5b0"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#bdcdd3"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e3eed3"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}];
  }

  $scope.init();
}]);
