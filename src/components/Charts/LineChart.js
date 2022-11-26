import React, {useState}from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from "axios"
import { Currencies, digitalCurrencies, physicalCurrencies } from "../CurrencyConverter";
import {ExchangeRate} from "../ExchangeRate"

import {Line} from 'react-chartjs-2'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("JPY")

  const getData = async () => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/data",
      params: {
        function: "FX_WEEKLY",
        from_symbol: firstCurrency,
        to_symbol: secondCurrency,
        datatype: "json",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log("response:",response)
        const responseDataObj = response.data["Time Series FX (Weekly)"];
        console.log("responseDataObj", responseDataObj)

        let array = [];
        for (const date in responseDataObj) {
          if (date.includes("2022")) {
            let valueObj = responseDataObj[date];
            array.push(valueObj["4. close"]);
          }
        }
        console.log("new array", array);
      })
      .catch((error) => {
        console.log("linechart error from the frontend");
        console.error(error);
      });
  }
  const chartDataReq = (e) => {
    e.preventDefault()
    getData()
  }


  return (
    <div>
      <form onSubmit={chartDataReq}>
        <div className="column-wrap">
          <div className="column second select-container">
            <p>From:</p>
            <select
              value={firstCurrency}
              name="currency-option-1"
              className="currency-options"
              onChange={(e) => setFirstCurrency(e.target.value)}
            >
              {/* {currencies.map((currency, index) => (
                  <option key={index}>{currency}</option>
                ))} */}
              {Currencies.map((currency, index) => (
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
              {/* {currencies2.map((currency, index) => (
                  <option key={index}>{currency}</option>
                ))} */}
              {physicalCurrencies.map((currency, index) => (
                <option key={index}>{currency.value}</option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={getData}>Data</button>
      </form>
    </div>
  );
}

export default LineChart
