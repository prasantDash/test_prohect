<template src="./Company.html"></template>
<script>
import ContactUsForm from './ContactUsForm.vue'
import CompanyFooter from './CompanyFooter.vue'
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
	name: 'Company',
	components: {
		ContactUsForm ,
		CompanyFooter
	},
	data: function(){
		return {
			title:"Company",
			center: [37,7749, -122,4194]
		}
	},
	methods: {
		setupLeafletMap: function () {
			const myCords = [12.9971,77.6692];
			const mymap = L.map('map').setView(myCords, 16);	

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
				maxZoom: 18,
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
					'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
				id: 'mapbox.streets'
			}).addTo(mymap);
			L.circle(myCords, 200, {
				color: '#5fec56',
				fillColor: '#5fec56',
				fillOpacity: 0.5
			}).addTo(mymap).bindPopup("Swamy Vivekananda Rd, Krishna Reddy Industrial Estate, Dooravani Nagar, Bengaluru, Karnataka 560016.");	
		}
	},
	mounted() {
		this.setupLeafletMap()			
	},
	created() {
		console.log("Created property in company template");			
	}
}
</script>
<style scoped>
div#company{
	min-height: 800px;
	//background-color: #fbfbfb;
}
canvas#myCanvas{
	//border:1px solid #d3d3d3;
	margin-top:10px
}
div.pageTitle{
	font-family: cursive;
    font-size: 50px;
    color: black;
}
div.pageMessage{
	font-family: cursive;
	font-style: italic;
	font-size: 20px;
}
div.titleContainer{
	position: relative;
	min-height: 500px;

}
div.btnCss{
	position: absolute;
    bottom: 0px;
    right: 0px;
}
div.pageMidMess{
	font-family: cursive;
	font-style: italic;
	font-size: 30px;
	color:#80b1ec
}
div.titleGap{
	min-height: 50px;
}
img#guidanceTranImg{
	height:400;
	width:100%;
	margin-top: 100px;
}
div.howToDo{
	text-align:center
}
div.serviceFor{
	text-align: center;
	margin: 100px;
}
#map {
	height: 370px;
	border: 6px solid #d6c3c3;
	border-radius: 5px;
}


</style>