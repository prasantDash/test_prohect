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
import animationCar from "leaflet/dist/images/car.png"
import animationTruck from "leaflet/dist/images/truck.gif"
import datetime from 'vuejs-datetimepicker';

/*
	if($type == 1){
		$icon = "<img class='devicon' style='padding:4px' src='img/person.png'></img>";
	} elseif($type == 2){
		$icon = "<img class='devicon' title='Bike' src='/svgicons/res/Motorcycle_Right_Blue.svg'></img>";
	} elseif($type == 3){
		$icon = "<img class='devicon' title='Car' src='/svgicons/res/Car_Right_Red.svg'></img>";
	} elseif($type == 4){
		$icon = "<img class='devicon' title='Bus' src='/svgicons/res/Coach_Right_Blue.svg'></img>";
	} elseif($type == 5){
		$icon = "<img class='devicon' title='Truck' src='/svgicons/res/Truck_Right_Yellow.svg'></img>";
	} elseif($type == 6){
		$icon = "<img class='devicon' title='School Bus' src='/svgicons/res/Coach_Right_Yellow.svg'></img>";
	} elseif($type == 7){
		$icon = "<img class='devicon' title='Crane' src='/svgicons/res/ConcretePump_Right_Grey.svg'></img>";
	} elseif($type == 8){
		$icon = "<img class='devicon' title='Tanker' src='/svgicons/res/FuelTankTruck_Right_Grey.svg'></img>";
	}
*/


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
			mapInit: true,
			vehicleImg: 'data:image/jpeg;base64,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nc7EcRjqojGWtjawMIkzMIfcMbplDxv+8g+scwHeP1WjWXcWgAWANyL77/opVrB/WO/ut+ZQbtpvxHyAC3EDeV/HX5qREBFHLO1v2nAfP0UEdZmJDRoOJQSOHaHjf0H8lOoI/teR/j5qdAREQEREBERAREQFFNAHDUefFSogp0rcuZu+xv5EK2FA/SQH3xl8xqpi4BBDPO1u82uuZN9p3iVcxOLMA4a5fkeKov3lBfoH3bbkfmrK5tG45rNI157jZXRIfvNPiNR+qCVYK1ErTxHyPxWyDRzgBc6KA1jOZ9FtO3Ow5Tfl5LloOga5vI/BamvHulUUQXev/h+P0WvXz7o9VURB04ajMPyUmZUaFpzd1teSv5UEU8+UXsoYa2ziXDeANO4reqgLrW4KJtCeJA+KCR+Jng0Dx1Vd9U92mY+A0+Ssto2jeb/ALbpWN0aL+AQVoqRx1OnzVyMAdlguf41JWWxvdv7A5D7X0VmOMNFgLIEUdu8neea3REBERAREQEREBERAREQRVLLt03jtDxCp10pcxpbuO/8ARdFUKgGN2Zv2XbxyKCWF5bGM28N/l+S5amnqS7TcOShQZY6xBHBX+uN03/oueiDqNma7iPP6qGpqABlbx003BUUIQT0s2XQ7j8FYfAx+vxC56zdBc6i3mfh+iz1Nnf6qlm71sGE8CfIoLnV4xy8ysgRj3fgVVFM8/dPyW7aF/IDxKCwalo4/BaGsHAEo3DjxcPLVTMoGjfc/D5IKzq08Go0yO3C3wHqV0GQtG5oHzUiCgygJ1e6/cP1KtxQtbuFu/ipEQEREBERAREQEREBERAREQEREBYIWUQVJKBp3XHyUZw78Xw+qvogoDDubvgpWULBvufH6K0iDRkYG4ALdEQa5ByCZByC2RAAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERB//9k=',
			rtoNumber: '',
			vehCategory: ""

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
				this.rtoNumber = res.data.rto;
				this.vehCategory = res.data.category;
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
					
					if(res.data.type == 3){
						this.vehicleImg = 'https://www.trackervigil.com/svgicons/res/Car_Right_Red.svg'
						vehicleIcom.options.iconUrl = animationCar
					}else{
						this.vehicleImg = 'https://www.trackervigil.com/svgicons/res/FuelTankTruck_Right_Grey.svg'
						vehicleIcom.options.iconUrl = animationTruck
					}
					
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