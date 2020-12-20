<script>
  import { Doughnut } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    data () {
      return {
        chartData: {
          labels: ["Active","Inactive"],
          datasets: [
            {
              borderWidth: 1,
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)'                             
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'                
              ],
              data: [0,0]
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      let vData = this.$store.state.Test.products;
      var activeVehicle = 0;
      var inAactiveVehicle = 0;
      for(var i = 0; i < vData.length; i++){
        
        if(vData[i].status == 1){
          activeVehicle = activeVehicle + 1;
        }else{
          inAactiveVehicle = inAactiveVehicle + 1;
        }
      }
      console.log(activeVehicle);
      console.log(inAactiveVehicle);
      this.chartData.datasets[0].data = [];
      this.chartData.datasets[0].data.push(activeVehicle)
      this.chartData.datasets[0].data.push(inAactiveVehicle)
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
<style scoped>
  #doughnut-chart{
    width: 100% !important;
    height: 200px !important;
  }
</style>