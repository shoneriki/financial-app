const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());

app.get("/convert", (req, res) => {
  const options = {
    method: "GET",
    url: "https://currency-converter18.p.rapidapi.com/api/v1/convert",
    params: { from: "USD", to: "JPY", amount: "1" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "currency-converter18.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log("inside then in  new api, response.data.:", response.data);
      res.json(response.data.result);
    })
    .catch(function (error) {
      console.log("error from backend new api:");
      console.error(error);
    });

  /* */

  // const fromCurrency = req.query.from_currency;
  // const toCurrency = req.query.to_currency;

  // const options = {
  //   method: "GET",
  //   url: "https://alpha-vantage.p.rapidapi.com/query",
  //   port: 443,
  //   params: {
  //     function: "CURRENCY_EXCHANGE_RATE",
  //     from_currency: fromCurrency,
  //     to_currency: toCurrency,
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  //     "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
  //   },
  // };

  // axios
  //   .request(options)
  //   .then(function(response) {
  //     console.log("response data?",response.data)
  //     res.json(
  //       response.data
  //     );
  //   })
  //   .catch(function (error) {
  //     console.log("error for currency api backend, apparently");
  //     console.error(error);
  //   });

  /* */
  // const from = req.data.from;
  // const to = req.data.to;
  // const convertedAmount = req.data.amountToConvert;
});



app.get("/news", (req, res) => {
  const options = {
    method: "GET",
    url: "https://crypto-news-live.p.rapidapi.com/news",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "crypto-news-live3.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
