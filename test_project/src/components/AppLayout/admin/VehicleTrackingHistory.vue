<template src="./VehicleTrackingHistory.html"></template>
<script>
//Plugin imported

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import "leaflet/dist/leaflet.css"
import "leaflet/dist/leaflet.js"
import testPage from "leaflet/dist/test.js"
import L from "leaflet"
import $ from 'jquery'
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"
import "leaflet-routing-machine/dist/leaflet-routing-machine.js"
//import animationCar from "leaflet/dist/images/car.png"
import animationTruck from "leaflet/dist/images/truck.gif"
import datetime from 'vuejs-datetimepicker';


export default {
	components: { 
		datetime
	},
	name:'VehicleTrackingHistory',
	data () {
		return {
			cName:'Vehicle tracking(History)',
			title:"Company",
			vCords: [],
			config: {},
			fromdate: '',
			todate: '',
			vehicleList: '',
			marker: {},
			routeLines: [],
			markers: [],
			mapInit: true

		}
	},
	methods: {
		stopAnimation: function (){
			this.marker.stop();
		},
		resumeAnimation: function (){
			this.marker.start();
		},
		startAnimation: function(){
			if(this.vehicleList == ""){
				alert("Please select vehicle");
				return false;
			}
			if(this.fromdate == ""){
				alert("Please select from date");
				return false;
			}

			if(this.todate == ""){
				alert("Please select todate date");
				return false;
			}
			testPage.test();

			let liveDataUrl = 'http://devapi.trackervigil.com/vehiclehistorydata'
			let  header = {
				headers: {
					Authorization: localStorage.getItem('tocken')
				}			
			};
			let article = {
				imei: this.vehicleList,
				rtoNumber: 'KA02AG2256',
				fromDate: this.fromdate,
				todate: this.todate 
			}
			var map;
			axios.post(liveDataUrl,article,header).then((res) => {
				var vData = res.data.data;
				console.log(res);

				if(vData.length > 1){

					var tmpData = []
					for(var i = 0; i < vData.length; i++){
						tmpData = [];
						tmpData.push(Number(vData[i].lat))
						tmpData.push(Number(vData[i].lng))
						this.vCords.push(tmpData);
					}
					this.routeLines = L.polyline(this.vCords)
					this.markers = []					

					var vehicleIcom = L.icon({
						iconSize: [25, 25],
						shadowUrl: null
					});
					
					vehicleIcom.options.iconUrl = animationTruck
					this.config.initLatLng = new L.LatLng(this.vCords[0][0],this.vCords[0][1])
					
					if(this.mapInit){
						map = L.map('map', {
							minZoom: this.config.minZoom,
							maxZoom: this.config.maxZoom
						});
						map.addLayer(new L.TileLayer(this.config.tileUrl, {attribution: this.config.tileAttrib}));
						map.addLayer(new L.TileLayer(this.config.overlayTileUrl));
						map.setView(this.config.initLatLng, this.config.initZoom);
						this.mapInit = false
					}
					
					
										

					this.marker = L.animatedMarker(this.routeLines.getLatLngs(), {
						icon: vehicleIcom,
						distance: 300,
						interval: 5000,
						autoStart: true,
						onEnd: function() {
							alert("Animation ended");
						}
					});
					
					this.marker.on("move", function(e){
						//console.log(e);
						map.setView(new L.LatLng(e.oldLatLng.lat, e.oldLatLng.lng));
					});
					map.addLayer(this.marker);
					this.markers.push(this.marker);
					
					$(this).hide();
				}else{
					alert("No data found");
					return false;
				}
				
				
			})		
		}
	},
	mounted() {
		//this.setupLeafletMap()
	},
	created() {
		this.config = {
			tileUrl: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
			overlayTileUrl: 'http://{s}.tiles.mapbox.com/v3/intertwine.nyc_bike_overlay/{z}/{x}/{y}.png',
			tileAttrib: 'Open Street Map',
			initZoom: 14,
			maxZoom: 18,
			minZoom:14
		};			
	},
	computed: {
		vehicleData: function(){
			let resData = this.$store.getters.products
			let vehicleImet = [],tmp = [];
			for(var i = 0; i < resData.length; i++){
				
				tmp = [];

				tmp.push(resData[i].deviceid)
				tmp.push(resData[i].name)
				
				vehicleImet.push(tmp)
			}
			
			return vehicleImet;
		} 
	}
}
</script>
<style scoped>
#map {
	height: 550px;
	border: 6px solid #d6c3c3;
	border-radius: 5px;
}



@keyframes mymove {
	from {background-color: red;}
	to {background-color: blue;}
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