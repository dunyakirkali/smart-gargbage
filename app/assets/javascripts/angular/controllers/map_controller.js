sgApp.controller('MapController', ['$scope',
function ($scope) {

  $scope.path;
  $scope.containers;

  $scope.init = function() {
    $scope.center = new google.maps.LatLng(41.875696,-87.624207);
    $scope.map_options = {
      zoom: 11,
      center: $scope.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: $scope.map_style()
    }

    $scope.map = new google.maps.Map(d3.select("#map_left").node(), $scope.map_options);

    var ctaLayer = new google.maps.KmlLayer({
      url: 'http://gmaps-samples.googlecode.com/svn/trunk/ggeoxml/cta.kml'
    });
    ctaLayer.setMap($scope.map);
  }


  $scope.map_style = function() {
    return [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#b5cbe4"}]},{"featureType":"landscape","stylers":[{"color":"#efefef"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#83a5b0"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#bdcdd3"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e3eed3"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}];
  }

  $scope.init();
}]);
