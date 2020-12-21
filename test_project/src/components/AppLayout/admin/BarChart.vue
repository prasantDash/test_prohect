<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

//Inporting vue chart
import { Bar } from 'vue-chartjs'
//Exporting it
export default{
	extends: Bar,
	data () {
		return {
			datacollection: {
				labels: [],
				datasets: [
					{
						label: 'Speed',
						backgroundColor: '#f87979',
						pointBackgroundColor: 'white',
						borderWidth: 1,
						pointBorderColor: '#249EBF',
						data: []
					}
				]
			},
			options: {
				scales:{
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						gridLines: {
							display: false
						}
					}]	
				},
				legend: {
					display: true
				},
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	mounted () {
		let resData = this.$store.getters.products		
		let vName = []
		let vSpeed = []		
		for(var i = 0; i < resData.length; i++){			
			vName.push(resData[i].name)
			vSpeed.push(Number(resData[i].speed))
		}		
		this.datacollection.labels = vName
		this.datacollection.datasets[0].data = vSpeed				

		this.renderChart(this.datacollection, this.options)		
    }
}
</script>
<style scoped>
#bar-chart{
	display: block !important;
    //width: 332px !important;
    height: 200px !important;
}
</style>