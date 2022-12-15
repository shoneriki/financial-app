import React from 'react'
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS, BarElement} from 'chart.js/auto'

ChartJS.register(
  BarElement
)

const BarChart = ({chartData}) => {

  var baseURL = "https://api.coinranking.com/v2/coins/?limit=10"
  var proxyUrl="https://cors-anywhere.herokuapp.com"

  var data={
    labels: ['Red','Blue','Yellow','Green','Purple', 'Orange'],
      datasets: [{
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        }],
  }

  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    },
    legend: {
      labels: {
        fontSize: 26
      }
    }
  }


  return (
    <div className="barchart">
      <Bar
        height={400}
        data={data}
        options={options}
      />
    </div>
  )
}

export default BarChart
