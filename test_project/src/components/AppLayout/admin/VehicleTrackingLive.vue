<template src="./VehicleTrackingLive.html"></template>
<script>
//Plugin imported

import "leaflet/dist/leaflet.css"
import L from "leaflet"
import DatatableFactory from 'vuejs-datatable'

export default {
	components: { DatatableFactory },
	name:'VehicleTrackingLive',
	data () {
		return {
			cName:'Vehicle tracking(Live)',
			title:"Company",
			center: [37,7749, -122,4194]			
		}
	},
	methods: {
		setupLeafletMap: function () {
			var myCords = [];			
			var liveData = this.$store.getters.products;
			var vehicleLocation = [],vData = [];
			for( var i = 0; i < liveData.length; i++){
				if( i == 0){
					myCords.push(liveData[i].lat)
					myCords.push(liveData[i].lon)
				}
				
				vData = []

				vData.push(liveData[i].name)
				vData.push(liveData[i].lat)
				vData.push(liveData[i].lon)
				vData.push(liveData[i].type)
				
				vehicleLocation.push(vData)
			}

			
			
			var mymap = L.map('map').setView(myCords, 16);
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
				maxZoom: 18,
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
					'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox.streets'
			}).addTo(mymap);

			//Add marker on map
			var greenIcon = L.icon({
				iconUrl: 'https://www.trackervigil.com/svgicons/res/Truck_Right_Yellow.svg',
				
				iconSize:     [38, 95], // size of the icon
				iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
				popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
			});
			
			
			
			
			

			for( i = 0; i < vehicleLocation.length; i++){
				greenIcon.options.iconUrl = 'https://www.trackervigil.com/'+vehicleLocation[i][3]
				L.marker([vehicleLocation[i][1],vehicleLocation[i][2]],{icon: greenIcon}).bindPopup(vehicleLocation[i][0]).addTo(mymap);
			}
			//Create geofence on map
			//http://devapi.trackervigil.com/getgeofences.php
			L.circle(myCords, 200, {
				color: '#5fec56',
				fillColor: '#5fec56',
				fillOpacity: 0.5
			}).addTo(mymap).bindPopup("Swamy Vivekananda Rd, Krishna Reddy Industrial Estate, Dooravani Nagar, Bengaluru, Karnataka 560016.");
			console.log(localStorage.tocken);
		}
	},
	mounted() {
		this.setupLeafletMap()
		//$('#dataTable').DataTable();
	},
	created() {
		console.log("Created method get called");
					
	}
}
</script>
<style scoped>
#map {
	height: 550px;
	border: 6px solid #d6c3c3;
	border-radius: 5px;
}

</style>