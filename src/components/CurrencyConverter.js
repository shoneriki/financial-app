import React, { useState } from "react";
import axios from "axios";

import ExchangeRate from "./ExchangeRate";

const CurrencyConverter = () => {
  const currencies = ["USD", "JPY","EUR", "BTC", "KWR", "ETH","XRP", "LTC", "ADA"];

  // change names later?
  const [primaryCurrency, setPrimaryCurrency] = useState(currencies[0]);
  const [secondaryCurrency, setSecondaryCurrency] = useState(currencies[1]);

  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);

  const convert = () => {
    // const options = {
    //   method: "GET",
    //   url: "http://localhost:8000/convert",
    //   params: {
    //     from_currency: primaryCurrency,
    //     function: "CURRENCY_EXCHANGE_RATE",
    //     to_currency: secondaryCurrency,
    //   },
    // };

    // axios
    //   .request(options)
    //   .then((response) => {
    //     console.log("response:", response);
    //     console.log(response.data);
    //     console.log("what exchange rate should be: ", response.data);
    //     if (
    //       response.data[["Realtime Currency Exchange Rate"]] &&
    //       response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
    //     )
    //     {
    //       setExchangeRate(
    //         response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
    //       );
    //       setResult(
    //         response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
    //           amount
    //       );
    //       console.log("exchangeRate:", exchangeRate);
    //       console.log("setResult", result);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("currency error from the frontend");
    //     console.error(error);
    //   });

    const options = {
      method: "GET",
      // url: "https://currency-converter18.p.rapidapi.com/api/v1/convert",
      url: "http://localhost:8000/convert",
      params: { from: primaryCurrency, to: secondaryCurrency, amount: amount },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(
          "inside .then in frontend, response.data:",
          response.data
        );
        console.log("response.data.convertedAmount", response.data.convertedAmount)
        setResult(
          response.data.convertedAmount
        )
      })
      .catch(function (error) {
        console.log("inside error in frontend")
        console.error(error);
      });


  };

  return (
    <div>
      <div className="currency-converter">
        <div className="input-container">
          <h2>Currency Converter</h2>
          <table>
            <tbody>
              <tr>
                <td>Primary Currency:</td>
                <td>
                  <input
                    type="number"
                    name="currency-amount-1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    value={primaryCurrency}
                    name="currency-option-1"
                    className="currency-options"
                    onChange={(e) => setPrimaryCurrency(e.target.value)}
                  >
                    {currencies.map((currency, index) => (
                      <option key={index}>{currency}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>Secondary Currency:</td>
                <td>
                  <input
                    type="number"
                    name="currency-amount-2"
                    value={result}
                    disabled={true}
                  />
                </td>
                <td>
                  <select
                    value={secondaryCurrency}
                    name="currency-option-2"
                    className="currency-options"
                    onChange={(e) => setSecondaryCurrency(e.target.value)}
                  >
                    {currencies.map((currency, index) => (
                      <option key={index}>{currency}</option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <button id="convert-btn" onClick={convert}>
            Convert
          </button>
        </div>
      </div>
      <ExchangeRate
        // exchangeRate={exchangeRate}
        primaryCurrency={primaryCurrency}
        secondaryCurrency={secondaryCurrency}
      />
    </div>
  );
};

export default CurrencyConverter;
