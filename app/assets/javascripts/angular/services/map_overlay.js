map_overlay.prototype = new google.maps.OverlayView();
map_overlay.prototype.onAdd = function() {}
map_overlay.prototype.onRemove = function() {}
map_overlay.prototype.draw = function() {}

function map_overlay(map) {
  this.gmap = map;
}

sgApp.factory('map_overlay', function ($rootScope) {
  return map_overlay;
});
