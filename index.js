var map;
var area;
var mapArea;
var marker=[];


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: 38.8538599, lng: -77.0491629},
      mapTypeId: 'roadmap'
    });

    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.null,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
          drawingModes: ['marker', 'circle', 'polygon']//, 'polyline', 'rectangle']
        },
      });
      drawingManager.setMap(map);

      document.getElementById('toggle-drawing').addEventListener('click', function() {
        toggleDrawing(drawingManager);
      });

    //not addEventListener!!!
    //clear area after drawing new area
    //make it editable
      drawingManager.addListener('overlaycomplete', function(event){
        var overlaytype = event.type;
        if(area && overlaytype !== 'marker'){
            area.setMap(null);
        }
        
        
        if(overlaytype === 'circle' || overlaytype === 'polygon'){
            area = event.overlay;
            area.setEditable(true);
        }
        if(overlaytype !== 'marker'){
            drawingManager.setDrawingMode(null);
            
        }

    });

  
    
    drawingManager.addListener('polygoncomplete', function(e){
        //calculate area
        mapArea = google.maps.geometry.spherical.computeArea(area.getPath());
        mapArea = mapArea.toPrecision(10);
        console.log('Area :' + mapArea);
        document.getElementById('area').innerHTML= mapArea + 'm^2';
    })
    
    drawingManager.addListener('circlecomplete', function(e){
        //calculate area
        var radius = area.getRadius();
        mapArea = radius * radius * Math.PI;
        mapArea = mapArea.toPrecision(10);
        console.log('Area :' + mapArea);
        document.getElementById('area').innerHTML= mapArea + 'm^2';
    })
    
 
}


function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
      drawingManager.setMap(null);
      // In case the user drew anything, get rid of the polygon
      /*
      if (polygon !== null) {
        polygon.setMap(null);
      }
      */
    } else {
      drawingManager.setMap(map);
    }
  }

