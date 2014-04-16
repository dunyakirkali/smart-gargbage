// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation

$(function(){ 
  $(document).foundation(); 
  
  var mapOptions = { 
    zoom: 14, 
    center: new google.maps.LatLng(43.093336741, -75.194946527),
    mapTypeControlOptions: {
       mapTypeIds: []
    },
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    draggable: false,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };
  $scope.draw_map = new google.maps.Map(d3.select("#map").node(), mapOptions);
});
