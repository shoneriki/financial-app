import React, { useState } from "react";
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
import axios from "axios";
import {
  Currencies,
  digitalCurrencies,
  physicalCurrencies,
} from "../CurrencyConverter";
import { ExchangeRate } from "../ExchangeRate";
import Loading from "../Loading";

import { Line } from "react-chartjs-2";

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
        console.log("response:", response);
        const responseDataObj = response.data["Time Series FX (Weekly)"];
        console.log("responseDataObj", responseDataObj);
        // let dateArray = [];
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
        // setDateArray();
        setDataArray(properDataArray);
      })
      .catch((error) => {
        console.log("linechart error from the frontend");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const chartDataReq = (e) => {
    // e.preventDefault()
    setLoading(true);
    getData();
  };

  return (
    <div className="lineChart-wrap">
      {/* <form onSubmit={chartDataReq}> */}
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
            {physicalCurrencies.map((currency, index) => (
              <option key={index}>{currency.value}</option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={chartDataReq}>Weekly Exchange</button>
      <div className="dataColumn wrap">
        {/* <div>
            {dateArray.map((date, index) => (
              <div key={index}>
                <p>{date}</p>
              </div>
            ))}
          </div> */}
        {dataArray.map((weeklyClose, index) => (
            <p key={index}>
              {index + 1}: {weeklyClose},
            </p>
        ))}
      </div>
      {/* </form> */}
    </div>
  );
};

export default LineChart;
