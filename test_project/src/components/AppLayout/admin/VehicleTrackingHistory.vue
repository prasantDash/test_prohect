<template src="./VehicleTrackingHistory.html"></template>
<script>
//Plugin imported

import "leaflet/dist/leaflet.css"
import "leaflet/dist/leaflet.js"
import testPage from "leaflet/dist/test.js"
import L from "leaflet"
import $ from 'jquery'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.js"
import animationCar from "leaflet/dist/images/car.png"


export default {
	name:'VehicleTrackingHistory',
	data () {
		return {
			cName:'Vehicle tracking(History)',
			title:"Company",
			myCords: []

		}
	},
	methods: {
		setupLeafletMap: function () {
			testPage.test();
			

			var vCords = [
				[14.252125,76.661818],
				[14.251962,76.661388],
				[14.252012,76.661255],
				[14.252115,76.661410],
				[14.252230,76.661400],
				[14.252385,76.661748],
				[14.251963,76.661467],
				[14.251962,76.661492],
				[14.251933,76.661488],
				[14.252140,76.661410],
				[14.252343,76.661753],
				[14.252000,76.661520],
				[14.252055,76.661675],
				[14.252090,76.661448],
				[14.252233,76.661420],
				[14.251962,76.661492],
				[14.246143,76.664345],
				[14.240547,76.666103],
				[14.234995,76.667763],
				[14.228318,76.667718],
				[14.221763,76.667618],
				[14.215165,76.667498],
				[14.207700,76.667372],
				[14.200923,76.667228]
			];

			var config = {
				tileUrl : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
				overlayTileUrl : 'http://{s}.tiles.mapbox.com/v3/intertwine.nyc_bike_overlay/{z}/{x}/{y}.png',
				tileAttrib : 'Open Street Map',
				initLatLng : new L.LatLng(vCords[0][0],vCords[0][1]), // NYC
				initZoom : 14,
				maxZoom : 14
			};

			var bikeIcon = L.icon({
				iconUrl: animationCar,
				iconSize: [30, 25],
				shadowUrl: null
			});

			

			var map = L.map('map', {minZoom: config.minZoom, maxZoom: config.maxZoom}),
			routeLines = [L.polyline(vCords)],markers = [];

			map.addLayer(new L.TileLayer(config.tileUrl, {attribution: config.tileAttrib}));
			map.addLayer(new L.TileLayer(config.overlayTileUrl));
			map.setView(config.initLatLng, config.initZoom);

			$.each(routeLines, function(i, routeLine) {

				var marker = L.animatedMarker(routeLine.getLatLngs(), {
					icon: bikeIcon,
					distance: 300,
                    interval: 5000,
					autoStart: true,
					onEnd: function() {
						/*
						$(this._shadow).fadeOut();
						$(this._icon).fadeOut(3000, function(){
							alert("Animation end");
							map.removeLayer(this);
						});
						*/
						
					}
				});
				marker.on("move", function(e){
					console.log(e);
					var ang = Math.atan((e.latlng.lat-e.oldLatLng.lat)/(e.latlng.lat-e.oldLatLng.lng));
					console.log(ang);
					map.setView(new L.LatLng(e.oldLatLng.lat, e.oldLatLng.lng), 14);
				});
				map.addLayer(marker);
				markers.push(marker);
			});
			$.each(markers, function(i, marker) {
				marker.start();
			});

			$(this).hide();	
		}
	},
	mounted() {
		this.setupLeafletMap()
	},
	created() {
		this.myCords = [14.252125,76.661818]				
	}
}
</script>
<style scoped>
#map {
	height: 550px;
	border: 6px solid #d6c3c3;
	border-radius: 5px;
}



#start {
	position: absolute;
	right: 30px;
	bottom: 30px;
	font-size: 40px
}

/* All of this is from cibi.me */

#branding {
height: 0;
overflow: visible;
position: relative;
z-index: 100;
color: #fff;

background-color: #444;

background-image: linear-gradient(bottom, rgb(68,68,68) 0%, rgb(102,102,102) 100%);
background-image: -o-linear-gradient(bottom, rgb(68,68,68) 0%, rgb(102,102,102) 100%);
background-image: -moz-linear-gradient(bottom, rgb(68,68,68) 0%, rgb(102,102,102) 100%);
background-image: -webkit-linear-gradient(bottom, rgb(68,68,68) 0%, rgb(102,102,102) 100%);
background-image: -ms-linear-gradient(bottom, rgb(68,68,68) 0%, rgb(102,102,102) 100%);

background-image: -webkit-gradient(
linear,
left bottom,
left top,
color-stop(0, rgb(68,68,68)),
color-stop(1, rgb(102,102,102))
);
}

/* the logo */
#logo {
position: absolute;
top: 1.5em;
right: 0;
margin-top: -15px;
overflow: hidden;
padding: 10px 0 10px 3.5em;
}
#logo .ribbon {
position: relative;
height: 4em;
right: -10px;
padding: 0 10px 0 1.5em;
border-top: 1px solid #529be6;
border-bottom: 1px solid #2a65a1;

background-color: #68aff7;

background-image: linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);
background-image: -o-linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);
background-image: -moz-linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);
background-image: -webkit-linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);
background-image: -ms-linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);

background-image: -webkit-gradient(
linear,
left bottom,
left top,
color-stop(0, rgb(86,162,238)),
color-stop(1, rgb(120,185,255))
);

-moz-box-shadow: inset -2px 1px 1px rgba(255,255,255,0.5);
-webkit-box-shadow: inset -2px 1px 1px rgba(255,255,255,0.5);
box-shadow: inset -2px 1px 1px rgba(255,255,255,0.5);
}
#logo .ribbon:before,
#logo .ribbon:after {
content: "\0020";
display: block;
width: 100%;
height: 100%;
position: absolute;
top: -1px;
right: -1px;
z-index: -1;
border: 1px solid #2a65a1;
border-top: 1px solid #529be6;
border-left: 2px solid #498fd7;

background-color: #68aff7;

background-image: linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);
background-image: -o-linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);
background-image: -moz-linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);
background-image: -webkit-linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);
background-image: -ms-linear-gradient(bottom, rgb(86,162,238) 0%, rgb(120,185,255) 100%);

background-image: -webkit-gradient(
linear,
left bottom,
left top,
color-stop(0, rgb(86,162,238)),
color-stop(1, rgb(120,185,255))
);

transform: skew(45deg,0deg);
-ms-transform: skew(45deg,0deg);
-webkit-transform: skew(45deg,0deg);
-o-transform: skew(45deg,0deg);
-moz-transform: skew(45deg,0deg);

-webkit-border-radius: 8px;
-moz-border-radius: 8px;
border-radius: 8px;

-moz-box-shadow: -5px 0 15px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255,255,255,0.5);
-webkit-box-shadow: -5px 0 15px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255,255,255,0.5);
box-shadow: -5px 0 15px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255,255,255,0.5);
}
#logo .ribbon:after {
padding-right: 6em;
right: -6em;
margin-right: -1px;
border-left: 2px solid #498fd7;
transform: skew(-45deg,0deg);
-ms-transform: skew(-45deg,0deg);
-webkit-transform: skew(-45deg,0deg);
-o-transform: skew(-45deg,0deg);
-moz-transform: skew(-45deg,0deg);

-moz-box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(255,255,255,0.5);
-webkit-box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(255,255,255,0.5);
box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 1px rgba(255,255,255,0.5);
}

#site-title {
font-family: 'Dancing Script', cursive;
font-size: 3.25em;
margin: -0.2em 20px 0 0;
line-height: 1;
}
#site-title a {
text-decoration: none;
color: #fff;
text-shadow: -1px -1px 1px rgba(42,101,161,0.25),
-1px  1px 1px rgba(42,101,161,0.25),
1px -1px 1px rgba(42,101,161,0.25),
1px  1px 1px rgba(42,101,161,0.25)
}
#site-title a:hover {
text-shadow: -1px -1px 1px rgba(42,101,161,0.5),
-1px  1px 1px rgba(42,101,161,0.75),
1px -1px 1px rgba(42,101,161,0.25),
1px  1px 1px rgba(42,101,161,0.5)
}
#site-description {
color: #dfeefd;
font-size: 1em;
margin: 0 20px 0 0;
text-shadow: -1px -1px 1px rgba(42,101,161,0.25),
-1px  1px 1px rgba(42,101,161,0.25),
1px -1px 1px rgba(42,101,161,0.25),
1px  1px 1px rgba(42,101,161,0.25)
}

/* AddThis */
#branding .addthis_toolbox {
margin: 0.5em 0 0 0.5em;
float: left;
min-width: 163px;
}

/* Navigation: Main Menu */
#main-menu {
padding: .25em;
float: right;
}
#main-menu li {
float: left;
}
#main-menu a {
display: block;
color: #fff;
font-size: 1em;
font-weight: bold;
line-height: 1.75;
text-decoration: none;
padding: 0 0.75em;
position: relative;
z-index: 1000;
-webkit-border-radius: 3px;
-moz-border-radius: 3px;
border-radius: 3px;
}
#main-menu a:hover {
background-color: #333;
}

/* Location Search Form */
#branding .search {
padding: 1em;
}
#branding .search input {
width: 15em;
padding: 0.5em;
background: #eee;
border: 0;
font-weight: bold;
-webkit-border-radius: 3px;
-moz-border-radius: 3px;
border-radius: 3px;

background-image: linear-gradient(bottom, rgb(229,229,229) 0%, rgb(208,208,208) 100%);
background-image: -o-linear-gradient(bottom, rgb(229,229,229) 0%, rgb(208,208,208) 100%);
background-image: -moz-linear-gradient(bottom, rgb(229,229,229) 0%, rgb(208,208,208) 100%);
background-image: -webkit-linear-gradient(bottom, rgb(229,229,229) 0%, rgb(208,208,208) 100%);
background-image: -ms-linear-gradient(bottom, rgb(229,229,229) 0%, rgb(208,208,208) 100%);

background-image: -webkit-gradient(
linear,
left bottom,
left top,
color-stop(0, rgb(229,229,229)),
color-stop(1, rgb(208,208,208))
);
}
#branding .search ::-webkit-input-placeholder { color: #777; }
#branding .search :-moz-placeholder { color: #777; }


@media only screen and (min-width: 768px) {
	#logo {
		right: 0;
		top: 2em;
	}

	#logo .ribbon {
		height: 5em;
	}

	#site-title {
		font-size: 4.25em;
	}
	#site-description {
		font-size: 1.25em;
	}

	/* Map UI */
	.leaflet-control-zoom {
		display: block;
	}
	.leaflet-container .leaflet-control-attribution {
		font-size: 10px;
	}
}

</style>