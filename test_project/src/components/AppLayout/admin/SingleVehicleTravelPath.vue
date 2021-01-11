<template src="./SingleVehicleTravelPath.html"></template>
<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import datetime from 'vuejs-datetimepicker'
import testPage from "leaflet/dist/test.js"

Vue.use(VueAxios, axios)

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

export default {
	name: 'singleVehicleTravelPath',
	components: { 
		datetime
	},
	data: function(){
		return {
			fromdate: "",
			todate: "",
			vehicleList: ''
		}
	},
	methods: {
		submitInputs: function(){
			

			let liveDataUrl = 'http://devapi.trackervigil.com/travelpathjwt'
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
			
			axios.post(liveDataUrl,article,header).then((res) => {
				var resData = res.data.data;
				console.log(res);
				var myData = [],tmp = {};
				for(var i = 0; i < resData.length; i++){
					tmp = {};

					tmp.dt = resData[i].timestamp;
					tmp.add = resData[i].address;
					tmp.lat = resData[i].lat;
					tmp.lng = resData[i].lng;

					tmp.ign = resData[i].ign;
					tmp.ac = resData[i].ac;
					tmp.rto = res.data.rto;
					tmp.category = res.data.category;

					tmp.vendor = res.data.vendor;

					myData.push(tmp)
				}
				console.log(myData);			
				
				
				$('#travelPath').DataTable({
					columns:[
						{"sTitle":"Date and time",data:"dt"},
						{"sTitle":"RTO Number",data:"rto"},
						{"sTitle":"Address",data:"add"},
						{"sTitle":"Latitude",data:"lat"},

						{"sTitle":"Longitude",data:"lng"},
						{"sTitle":"Ignition",data:"ign"},
						{"sTitle":"AC",data:"ac"},
						{"sTitle":"Category",data:"category"},

						{"sTitle":"Vendor",data:"vendor"}
						
					],
					lengthMenu: [
						[-1,5,10,25, 50, 100],
						["All",5,10,25,50,100]
					],
					data: myData,
					destroy: true
				});
			});
		}
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
	},
	created() {
		testPage.jqueryDatatables()
		testPage.bootstrapDatatable4();
	}
}
</script>
<style scoped>
table.dataTable {
    clear: both;
    margin-top: 6px !important;
    margin-bottom: 6px !important;
    max-width: none !important;
    border-collapse: separate !important;
    border-spacing: 0;
}
table.dataTable td,
table.dataTable th {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}
table.dataTable td.dataTables_empty,table.dataTable th.dataTables_empty {
    text-align: center;
}
table.dataTable.nowrap th,
table.dataTable.nowrap td {
    white-space: nowrap;
}
div.dataTables_wrapper div.dataTables_length label {
    font-weight: normal;
    text-align: left;
    white-space: nowrap;
}
div.dataTables_wrapper div.dataTables_length select {
    width: auto;
    display: inline-block;
}
div.dataTables_wrapper div.dataTables_filter {
    text-align: right;
}
div.dataTables_wrapper div.dataTables_filter label {
    font-weight: normal;
    white-space: nowrap;
    text-align: left;
}
div.dataTables_wrapper div.dataTables_filter input {
    margin-left: 0.5em;
    display: inline-block;
    width: auto;
}
div.dataTables_wrapper div.dataTables_info {
    padding-top: 0.85em;
}
div.dataTables_wrapper div.dataTables_paginate {
    margin: 0;
    white-space: nowrap;
    text-align: right;
}
div.dataTables_wrapper div.dataTables_paginate ul.pagination {
    margin: 2px 0;
    white-space: nowrap;
    justify-content: flex-end;
}
div.dataTables_wrapper div.dataTables_processing {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    margin-top: -26px;
    text-align: center;
    padding: 1em 0;
}
table.dataTable > thead > tr > th:active,
table.dataTable > thead > tr > td:active {
    outline: none;
}
table.dataTable > thead > tr > th:not(.sorting_disabled),
table.dataTable > thead > tr > td:not(.sorting_disabled) {
    padding-right: 30px;
}
table.dataTable > thead .sorting,
table.dataTable > thead .sorting_asc,
table.dataTable > thead .sorting_desc,
table.dataTable > thead .sorting_asc_disabled,
table.dataTable > thead .sorting_desc_disabled {
    cursor: pointer;
    position: relative;
}
table.dataTable > thead .sorting:before,
table.dataTable > thead .sorting:after,
table.dataTable > thead .sorting_asc:before,
table.dataTable > thead .sorting_asc:after,
table.dataTable > thead .sorting_desc:before,
table.dataTable > thead .sorting_desc:after,
table.dataTable > thead .sorting_asc_disabled:before,
table.dataTable > thead .sorting_asc_disabled:after,
table.dataTable > thead .sorting_desc_disabled:before,
table.dataTable > thead .sorting_desc_disabled:after {
    position: absolute;
    bottom: 0.9em;
    display: block;
    opacity: 0.3;
}
table.dataTable > thead .sorting:before,
table.dataTable > thead .sorting_asc:before,
table.dataTable > thead .sorting_desc:before,
table.dataTable > thead .sorting_asc_disabled:before,
table.dataTable > thead .sorting_desc_disabled:before {
    right: 1em;
    content: "↑";
}
table.dataTable > thead .sorting:after,
table.dataTable > thead .sorting_asc:after,
table.dataTable > thead .sorting_desc:after,
table.dataTable > thead .sorting_asc_disabled:after,
table.dataTable > thead .sorting_desc_disabled:after {
    right: 0.5em;
    content: "↓";
}
table.dataTable > thead .sorting_asc:before,
table.dataTable > thead .sorting_desc:after {
    opacity: 1;
}
table.dataTable > thead .sorting_asc_disabled:before,
table.dataTable > thead .sorting_desc_disabled:after {
    opacity: 0;
}
div.dataTables_scrollHead table.dataTable {
    margin-bottom: 0 !important;
}
div.dataTables_scrollBody table {
    border-top: none;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
div.dataTables_scrollBody table thead .sorting:before,
div.dataTables_scrollBody table thead .sorting_asc:before,
div.dataTables_scrollBody table thead .sorting_desc:before,
div.dataTables_scrollBody table thead .sorting:after,
div.dataTables_scrollBody table thead .sorting_asc:after,
div.dataTables_scrollBody table thead .sorting_desc:after {
    display: none;
}
div.dataTables_scrollBody table tbody tr:first-child th,
div.dataTables_scrollBody table tbody tr:first-child td {
    border-top: none;
}
div.dataTables_scrollFoot > .dataTables_scrollFootInner {
    box-sizing: content-box;
}
div.dataTables_scrollFoot > .dataTables_scrollFootInner > table {
    margin-top: 0 !important;
    border-top: none;
}
@media screen and (max-width: 767px) {
    div.dataTables_wrapper div.dataTables_length,
    div.dataTables_wrapper div.dataTables_filter,
    div.dataTables_wrapper div.dataTables_info,
    div.dataTables_wrapper div.dataTables_paginate {
        text-align: center;
    }
    div.dataTables_wrapper div.dataTables_paginate ul.pagination {
        justify-content: center !important;
    }
}
table.dataTable.table-sm > thead > tr > th:not(.sorting_disabled) {
    padding-right: 20px;
}
table.dataTable.table-sm .sorting:before,
table.dataTable.table-sm .sorting_asc:before,
table.dataTable.table-sm .sorting_desc:before {
    top: 5px;
    right: 0.85em;
}
table.dataTable.table-sm .sorting:after,
table.dataTable.table-sm .sorting_asc:after,
table.dataTable.table-sm .sorting_desc:after {
    top: 5px;
}
table.table-bordered.dataTable {
    border-right-width: 0;
}
table.table-bordered.dataTable th,
table.table-bordered.dataTable td {
    border-left-width: 0;
}
table.table-bordered.dataTable th:last-child,
table.table-bordered.dataTable th:last-child,
table.table-bordered.dataTable td:last-child,
table.table-bordered.dataTable td:last-child {
    border-right-width: 1px;
}
table.table-bordered.dataTable tbody th,
table.table-bordered.dataTable tbody td {
    border-bottom-width: 0;
}
div.dataTables_scrollHead table.table-bordered {
    border-bottom-width: 0;
}
div.table-responsive > div.dataTables_wrapper > div.row {
    margin: 0;
}
div.table-responsive > div.dataTables_wrapper > div.row > div[class^="col-"]:first-child {
    padding-left: 0;
}
div.table-responsive > div.dataTables_wrapper > div.row > div[class^="col-"]:last-child {
    padding-right: 0;
}

</style>