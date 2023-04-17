const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/convert", (req, res) => {

  const fromCurrency = req.query.from_currency;
  const toCurrency = req.query.to_currency;

  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    port: 443,
    params: {
      function: "CURRENCY_EXCHANGE_RATE",
      from_currency: fromCurrency,
      to_currency: toCurrency,
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function(response) {
      console.log("response data",response.data)
      res.json(
        response.data
      );
    })
    .catch(function (error) {
      console.log("error for currency api backend");
      console.error(error);
    });

  /* */
});

app.get("/data", async (req, res) => {
  const firstCurrency = req.query.from_symbol;
  const secondCurrency = req.query.to_symbol;
  const options = {
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    port: 443,
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
  axios
    .request(options)
    .then(function (response) {
      const responseDataObj = response.data["Time Series FX (Monthly)"]
      console.log('responseDataObj', responseDataObj)
      let array = [];
      for (const date in responseDataObj) {
        if (date.includes("2022")) {
          let valueObj = responseDataObj[date];
          array.push(valueObj["4. close"])
        }
      }
      console.log("new monthly array", array)
      res.json(
        response.data
      )
      })
    .catch(function (error) {
      console.error(error);
    });
  })

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
