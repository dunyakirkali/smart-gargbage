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
//= require d3
//= require angular
//= require angular/app
//= require angular/controllers/time_controller

$(function(){ 
  $(document).foundation(); 
  
  load_right_map();
  load_left_map();
  
});

function load_left_map() {
  var chicago = new google.maps.LatLng(41.875696,-87.624207);
  var mapOptions = {
    zoom: 11,
    center: chicago
  }

  var left_map = new google.maps.Map(d3.select("#map_left").node(), mapOptions);

  var ctaLayer = new google.maps.KmlLayer({
    url: 'http://gmaps-samples.googlecode.com/svn/trunk/ggeoxml/cta.kml'
  });
  ctaLayer.setMap(left_map);
}

function load_right_map() {
  var mapOptions = { 
    zoom: 15, 
    center: new google.maps.LatLng(39.89139, 32.78472)
  };
  
  var right_map = new google.maps.Map(d3.select("#map_right").node(), mapOptions);

  var ctaLayer = new google.maps.KmlLayer({
    url: "https://maps.google.com/maps/ms?authuser=0&vps=2&ie=UTF8&msa=0&output=kml&msid=216545768027274207201.0004f76932199a0f4378d"
  });
  ctaLayer.setMap(right_map);
}
