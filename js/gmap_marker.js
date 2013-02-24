/* $Id: gmap_marker.js,v 1.3 2009/02/11 18:40:31 bdragon Exp $ */

/**
 * @file
 * GMap Markers
 * GMap API version -- No manager
 */

/*global Drupal, GMarker */

Drupal.behaviors.gmap = function () {	  
  //Initialize the link between gmap-marker items in a table and the gmap map
  $(".gmap-marker").each(function(i) {
     $(this).hover(
      function(){
        $(this).find(".gmap-marker-icon img").attr('src', '/sites/all/modules/contrib/gmap/markers/hnumber'+(i+1)+'.png');
        Drupal.gmap.highlight_marker(i);
      },
      function(){
        $(this).find(".gmap-marker-icon img").attr('src', '/sites/all/modules/contrib/gmap/markers/number'+(i+1)+'.png');
        Drupal.gmap.clear_marker(i);
      });
  });	
}

// Replace to override marker creation
Drupal.gmap.factory.marker = function (loc, opts) {
  //return new GMarker(loc, opts);
  
  //SJ edit, PdMarkers have greater control over map markers such as ref from outside map
  opts.icon.iconSize.height = 35;
  opts.icon.iconSize.width = 28;
  opts.icon.iconAnchor.x = 14;
  opts.icon.iconAnchor.y = 35;
  return new PdMarker(loc, opts);
};

Drupal.gmap.addHandler('gmap', function (elem) {
  var obj = this;

  obj.bind('addmarker', function (marker) {
    obj.map.addOverlay(marker.marker);
  });

  obj.bind('delmarker', function (marker) {
    obj.map.removeOverlay(marker.marker);
  });

  obj.bind('clearmarkers', function () {
    // @@@ Maybe don't nuke ALL overlays?
    obj.map.clearOverlays();
  });
});


//gmap call to highlight a marker on the map
Drupal.gmap.highlight_marker = function(id)
{
	var map = Drupal.gmap.getMap('gmap-auto1map-gmap0').map;

	//marker id's do not start at 0? I assume that all ids are sequential from the initial???
	var marker = map.getFirstMarker();
	var internalId = marker.getId() + id;
	
	var marker = map.getMarkerById(internalId);
	marker.topMarkerZIndex(); // bring marker to top  
	marker.setImage("/sites/all/modules/contrib/gmap/markers/hnumber"+(id+1)+".png"); // change graphic
}

//gmap call to remove the highlight but still keep the marker at top
Drupal.gmap.clear_marker = function(id)
{
	var map = Drupal.gmap.getMap('gmap-auto1map-gmap0').map;
	
	//marker id's do not start at 0? I assume that all ids are sequential from the initial???
	var marker = map.getFirstMarker();
	var internalId = marker.getId() + id;
	
	var marker = map.getMarkerById(internalId);
	marker.restoreImage();
	//marker.restoreMarkerZIndex();  
}
