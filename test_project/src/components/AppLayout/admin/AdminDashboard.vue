<template src="./AdminDashboard.html"></template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import DoughnutChart from './DoughnutChart'
import BarChart from './BarChart'


Vue.use(VueAxios, axios)



export default {
	name: 'AdminDashboard',
	components: {
		DoughnutChart,
		BarChart
	},
	data () {
		return {
			vehicleCount: 0			
		}
	},
	computed: {
		vCount (){
			return this.$store.getters.products.length			
		},
		runningVehicle () {
			let resData = this.$store.getters.products;
			var runningVeh = 0
			for(var i = 0; i < resData.length; i++){
				if(Number(resData[i].speed) > 1){
					runningVeh = runningVeh + 1;
				}				
			}
			return runningVeh;
		},
		vehicleACon () {
			let resData = this.$store.getters.products;
			var acon = 0;
			for(var i = 0; i < resData.length; i++){
				if(resData[i].ac == 1){
					acon = acon + 1;
				}				
			}
			return acon
		},
		idealVehicle () {
			let idealVeh = 0;
			let resData = this.$store.getters.products;
			for(var i = 0; i < resData.length; i++){
				if(resData[i].ign == 1){
					if(Number(resData[i].speed) <= 1){
						idealVeh = idealVeh + 1;
					}					
				}				
			}
			return idealVeh;
		},
		ignitionOff () {
			let ignitionOff = 0;
			let resData = this.$store.getters.products;
			for(var i = 0; i < resData.length; i++){
				if(resData[i].ign == 0){
					ignitionOff = ignitionOff + 1;					
				}				
			}
			return ignitionOff;
		}
	}		  
}
</script>
<style scoped>
span.textellipsis{
	white-space: nowrap; 
	width: 50px; 
	overflow: hidden;
	text-overflow: ellipsis; 
	//border: 1px solid #000000;

}
div.maintainancealert{
	background-color: #eaab4c;
	height: 100%;
	position:relative;
}
div.maintainancealert div.maintainanceNumber{
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 25px;
}

div.vehicleNoGPS{
	background-color: #f16363;
	height: 100%;
	position:relative;
}
div.vehicleNoGPS div.maintainanceNumber{
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 25px;
}
div.runningVehicle{
	background-color: #49ea47;
	height: 100%;
	position:relative;
}
div.runningVehicle div.maintainanceNumber{
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 25px;
}
div.ignitionOff{
	background-color: #eaab4c;
	height: 100%;
	position:relative;
}
div.ignitionOff div.maintainanceNumber{
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 25px;
}

div.idealVehicle{
	background-color: #79abd6;
	height: 100%;
	position:relative;
}
div.idealVehicle div.maintainanceNumber{
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 25px;
}
div.geoFenceOut{
	background-color: #79abd6;
	height: 100%;
	position:relative;
}
div.geoFenceOut div.maintainanceNumber{
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 25px;
}
div.geoFenceIn{
	background-color: #49ea47;
	height: 100%;
	position:relative;
}
div.geoFenceIn div.maintainanceNumber{
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 25px;
}
div.alarmNumber{
	background-color: #f16363;
	height: 100%;
	position:relative;
}
div.alarmNumber div.maintainanceNumber{
	position: absolute;
	top: 50%;
	left: 50%;
	-ms-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
	font-size: 25px;
}
div.dashboardContent{
	height: 250px;
    position: relative;
    border: 1px solid #d6b4b4;
    margin: 0px 0px 5px 0px;
}
div.dashboardSContent{
	height: 125px;
	position: relative;
	border: 1px solid #d6b4b4;
	margin: 0px 0px 5px 0px;
}
div.titleBlock{
	display: inline-block;
	position: absolute;
	top: 5px;
	left: 5px;
	font-style: italic;
	font-size: 14px;
}

div.detailButton{
	display: inline-block;
    position: absolute;
    top: 5px;
    right: 5px;
    font-style: italic;
	font-size: 14px;
	cursor: pointer;
    color: #113d63;
}

div.infNumber{
	display: inline-block;
    position: absolute;
    bottom: 5px;
    left: 5px;
    font-style: italic;
	font-size: 14px;
}

div.blockMainContaint{
	display: inline-block;
    position: absolute;
    top: 30px;
    left: 5px;
    height: 75%;
    width: 97%;
}

div.lastUpdate{
	display: inline-block;
    position: absolute;
    bottom: 5px;
    right: 5px;
    font-style: italic;
	font-size: 14px;
}
</style>