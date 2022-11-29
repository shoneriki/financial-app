import React, { useState } from "react";
import {
  Chart as ChartJS,
} from "chart.js";
import axios from "axios";
import {
  Currencies,
  digitalCurrencies,
  physicalCurrencies,
} from "../CurrencyConverter";
import { ExchangeRate } from "../ExchangeRate";
import Loading from "../Loading";
import Data from "../../utils/Data"

import { Line } from "react-chartjs-2";



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
        setDataArray(properDataArray);
        console.log("properDataArray",properDataArray)

        const months = Array.from({ length: 12 }, (item, i) => {
          return new Date(0, i).toLocaleString("en-US", { month: "long" });
        });
        setChartData({
          lables: months.map((data) => data),
          datasets:[
            {
              label: "Exchange Rate 2022",
              data: dataArray.map((data) => data)
            }
          ]
        })

      console.log("chartData",chartData)

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
    // e.preventDefault()
    setLoading(true);
    getData();
  };


  return (
    <div className="lineChart-wrap">
      {loading && <Loading />}
      <div className="column-wrap">
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
      <button onClick={chartDataReq}>Weekly Exchange</button>
      <div className="dataColumn wrap">
        <div>
          {/* {dataArray &&
              <Line data={dataArray}/>
            } */}
          {dataArray.map((monthlyClose, index) => (
            <p key={index}>
              {index + 1}: {monthlyClose},
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineChart;
