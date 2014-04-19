map_overlay.prototype = new google.maps.OverlayView();

function map_overlay(map) {
  this.speed = 0;
  this.time = 0.0;
  this.gmap = map;
  this.div;
  this.svg;
  this.group;
  this.circles = [];
  this.lengths = [];
  this.texts=[];
  this.pathNode;
  this.pathLength;
  this.dataLoaded = false;
  this.bounds;
}

map_overlay.prototype.onAdd = function() {

  var that = this;
  
  this.div = d3.select(this.getPanes().overlayLayer).append("div").attr("class", "d3map");
  this.svg = this.div.append('svg:svg');

};

map_overlay.prototype.addTrack = function(track) { 
  var overlayProjection = this.getProjection();
  var ne = this.bounds.getNorthEast(),
      sw = this.bounds.getSouthWest();
  var tracks = this.svg.append("svg:g").attr("id", "tracks");

  var swc = overlayProjection.fromLatLngToDivPixel(sw);
  var nec = overlayProjection.fromLatLngToDivPixel(ne);
  
  var googleMapProjection = function(coordinates) {
      var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
      var pixelCoordinates = overlayProjection.fromLatLngToDivPixel(googleCoordinates);
      return [pixelCoordinates.x, pixelCoordinates.y];
  }

  var path = d3.geo.path().projection(googleMapProjection);
  
  tracks.selectAll("path").data(track).enter().append("svg:path").attr("d", path).attr('class', 'track');  
};

map_overlay.prototype.addTrain = function(train) { 
  
  var trains = this.svg.append("svg:g").attr("id", "trains");
  
  for(var i = 0; i < train.carriages.length; i++) {
    var carriage = train.carriages[i];
    this.circles[i] = trains.append("circle").attr({ r: 10 }).attr('fill', carriage.color);
    this.lengths[i] = parseFloat(carriage.length);
    this.texts[i] = this.circles[i].append("text")
       .attr("text-anchor", "middle")
       .text(i);
  }
};


//
// Draw
//

map_overlay.prototype.redraw = function() {
  if(!this.dataLoaded) return;
  
  var bounds = this.gmap.getBounds();
  // 
  var ne = bounds.getNorthEast(),
      sw = bounds.getSouthWest();
  //           
  var overlayProjection = this.getProjection();
  
  var swc = overlayProjection.fromLatLngToDivPixel(sw);
  var nec = overlayProjection.fromLatLngToDivPixel(ne);
  // 
  var googleMapProjection = function(coordinates) {
      var googleCoordinates = new google.maps.LatLng(coordinates[1], coordinates[0]);
      var pixelCoordinates = overlayProjection.fromLatLngToContainerPixel(googleCoordinates);
      return [pixelCoordinates.x, pixelCoordinates.y];
  }
  
  var path = d3.geo.path().projection(googleMapProjection);
  this.svg.selectAll('path').attr('d', path);
  this.targetPath = d3.selectAll('#tracks')[0][0];
  this.pathNode = d3.select(this.targetPath).selectAll('path').node();
  this.pathLength = this.pathNode.getTotalLength();
  
  this.time += (this.speed * 0.000277777778 * 30.0 / this.gmap.getMapScale() / this.pathLength);
  
  $("#d3map").css('left', swc.x + 'px');
  $("#d3map").css('top', nec.y + 'px');
  $("#d3map").css('width', (nec.x - swc.x) + 'px');
  $("#d3map").css('height', (swc.y - nec.y) + 'px');
      
  
  var that = this;
  for(var i = 0; i < this.circles.length; i++) {
    this.circles[i].transition()
      .duration(30).attr({
      transform: function () {
        var total = 0;
        $.each(that.lengths.slice(0, i+1),function() {
            total += this;
        });
        var nT = that.time - (total / that.gmap.getMapScale() / that.pathLength);
        nT = nT - Math.floor(nT);
        var p = that.pathNode.getPointAtLength(that.pathLength * nT);
        var isoX = p.x;
        var isoY = p.y;
        that.gmap.panTo(that.getProjection().fromContainerPixelToLatLng(new google.maps.Point(isoX,isoY)));
        return "translate(" + [isoX, isoY] + ")";
      }
    }).attr('r', Math.ceil(this.lengths[i]  / this.gmap.getMapScale() / 2.0));
  }
};

map_overlay.prototype.onRemove = function() {  
  // this.vis.parentNode.removeChild(this.vis);
  // this.vis = null;
  // this.setMap(null);
};


sgApp.factory('map_overlay', function ($rootScope) {
  return map_overlay;
});
