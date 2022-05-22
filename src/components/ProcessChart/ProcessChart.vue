<template>
  <div>
    <h2 class="mb-5">Learning process</h2>

    <div class="bg-tabs-blue shadow-3xl p-5 rounded-2xl">
      <h3 class="text-white opacity-50">Made Cards</h3>
      <span class="font-bold text-3xl">633</span>

      <LineChart
          :options="chartOptions"
          :chart-data="chartData"
          width="200px"
          height="120px"
          cssClasses="text-white"
      />
    </div>
  </div>
</template>

<script>
import {Chart, registerables} from 'chart.js'
import {LineChart} from 'vue-chart-3'

Chart.register(...registerables)

export default {
  data() {
    return {
      chartData: {
        color: '#fff',
        labels: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5'],
        datasets: [
          {
            displayName: true,
            data: [400, 530, 533, 590, 670],
            borderWidth: '1',
            color: '#fff',
            borderColor: '#fff'
          },
        ],
        title: {
          display: false
        },
      },

      chartOptions: {
        scales: {
          x: {
            ticks: {
              color: '#fff'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff'
            }
          },
        },
        plugins: {
          legend: false,
          tooltip: false,
        },
        elements: {
          line: {
            fill: true,
            backgroundColor: '#00000030',
          },
          color: '#fff'
        }
      }
    }
  },

  components: {LineChart}
}
</script>