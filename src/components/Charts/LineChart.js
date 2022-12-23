import React, { useState } from "react";
import axios from "axios";
import { Currencies, digitalCurrencies, physicalCurrencies } from "../LeftSide";
import { ExchangeRate } from "../ExchangeRate";
import Loading from "../Loading";
import Data from "../../utils/Data";
import { Line } from "react-chartjs-2";

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const LineChart = ({ loading, setLoading }) => {
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("JPY");

  const [dataArray, setDataArray] = useState([]);
  const [dateArray, setDateArray] = useState([]);

  /* */
  const [chartData, setChartData] = useState({});

  const [userData, setUserData] = useState({});

  /* */



  const getData = async () => {
    setChartData(null)
    const options = {
      method: "GET",
      url: "http://localhost:8000/data",
      params: {
        function: "FX_MONTHLY",
        from_symbol: firstCurrency,
        to_symbol: secondCurrency,
        datatype: "json",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
      },
    };
    await axios
      .request(options)
      .then((response) => {
        console.log("response:", response);
        let responseDataObj = response.data["Time Series FX (Monthly)"];
        console.log("responseDataObj", responseDataObj);

        let dataArray = [];

        let properDataArray = dataArray.reverse();

        for (const date in responseDataObj) {
          if (date.includes("2022")) {
            // dateArray.push(date)
            let valueObj = responseDataObj[date];
            dataArray.push(valueObj["4. close"]);
          }
        }
        console.log("new array or dataArray", dataArray);
        console.log("properDataArray", properDataArray);
        setDataArray(properDataArray.reverse());

        const months = Array.from({ length: 12 }, (item, i) => {
          return new Date(0, i).toLocaleString("en-US", { month: "long" });
        });
        // setChartData({
        //   lables: months.map((data) => data),
        //   datasets:[
        //     {
        //       label: "Exchange Rate 2022",
        //       data: dataArray.map((data) => data)
        //     }
        //   ]
        // })
        setChartData(dataArray);

        console.log("chartData", chartData);
      })
      .catch((error) => {
        console.log("linechart error from the frontend");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const chartDataReq = () => {
    setLoading(true)
    getData();
  };

  //  const handleFirstCurrencyChange = (event) => {
  //    setChartData(null);
  //    setFirstCurrency(event.target.value);
  //    chartDataReq();
  //  };

  //  const handleSecondCurrencyChange = (event) => {
  //    setChartData(null);
  //    setSecondCurrency(event.target.value);
  //    chartDataReq();
  //  };

  const months = Array.from({ length: 12 }, (item, i) => {
    return new Date(0, i).toLocaleString("en-US", { month: "long" });
  });

  let currencyData = {
    labels: months.map((month) => month),
    datasets: [
      {
        label: `Monthly Currency Exchange : ${firstCurrency} - ${secondCurrency}`,
        data: dataArray.map((exchange) => exchange),
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 5,
        tension: 0.1,
      },
    ],
  };

  var chartOptions = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 8,
      },
    },
  };

  return (
    <div className="lineChart-wrap">
      {loading && <Loading />}
      <div className="column-wrap">
        <div className="row first-row">
          <div className="column second select-container">
            <p>From:</p>
            <select
              value={firstCurrency}
              name="currency-option-1"
              className="currency-options"
              onChange={(e) => setFirstCurrency(e.target.value)}
            >
              {physicalCurrencies.map((currency, index) => (
                <option key={index}>{currency.value}</option>
              ))}
            </select>
          </div>
          <div className="column third select-container">
            <p>To:</p>
            <select
              value={secondCurrency}
              name="currency-option-2"
              className="currency-options"
              onChange={(e) => setSecondCurrency(e.target.value)}
            >
              {physicalCurrencies.map((currency, index) => (
                <option key={index}>{currency.value}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row second-row">
          <button onClick={chartDataReq}>Monthly Exchange</button>
        </div>
      </div>
      <div className="dataColumn wrap">
        <div className="lineChart">
          <Line data={currencyData} height={400} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
