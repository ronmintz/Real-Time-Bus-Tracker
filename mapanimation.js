mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ubWludHoiLCJhIjoiY2t5NzJiOHB4MTFjdzJzb2JrMG1rcHpicyJ9.T8noZ2ALWAIfEcwS5we_qw';

// This is the map instance
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

var mapMarkers = [];

async function run() {
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
	console.log('-----------------------------');
	
	// remove any markers from previous time interval
	mapMarkers.forEach((marker)=>marker.remove());
	mapMarkers = [];

	for (let i = 0; i < locations.length; i++ ) {
		var longitude = locations[i].attributes.longitude;
		var latitude  = locations[i].attributes.latitude;
		var color;

		if (locations[i].attributes.direction_id)
			color = "red";	// going away from Harvard
		else
			color = "blue";	// going towards Harvard
		var marker = new mapboxgl.Marker({"color":color}).setLngLat([longitude, latitude]).addTo(map);
		mapMarkers.push(marker);
	}

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();
