import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {Button, Container, Box, Input,  InputLabel, Select, MenuItem, Typography} from '@mui/material'

import { useTheme } from "@mui/material/styles";

import ExchangeRate from "./ExchangeRate";

// export const Currencies = {
//   USD: { value: "USD", name: "US Dollars", sign: "$", digital: false },
//   CAD: { value: "CAD", name: "Canadian Dollars", sign: "$", digital: false },
//   AUD: { value: "AUD", name: "Australian Dollars", sign: "$", digital: false },
//   EUR: { value: "EUR", name: "Euro", sign: "€", digital: false },
//   JPY: { value: "JPY", name: "Japanese Yen", sign: "¥", digital: false },
//   GBP: { value: "GBP", name: "British Pound", sign: "£", digital: false },
//   ADA: { value: "ADA", name: "Cardano", sign: "₳", digital: true },
//   BNB: { value: "BNB", name: "BNB", sign: "BNB", digital: true },
//   BTC: { value: "BTC", name: "Bitcoin", sign: "₿", digital: true },
//   DOGE: { value: "DOGE", name: "Dogecoin", sign: "Ð", digital: true },
//   ETH: { value: "ETH", name: "Ethereum", sign: "Ξ", digital: true },
//   XRP: { value: "XRP", name: "XRP", sign: "x", digital: true },
//   USDT: { value: "USDT", name: "Tether", sign: "₮", digital: true },
// };

// const physicalCurrencies = Object.keys(Currencies).filter(currency=> Currencies[currency].digital)

export const Currencies = [
  { value: "USD", name: "US Dollars", sign: "$", digital: false },
  { value: "CAD", name: "Canadian Dollars", sign: "$", digital: false },
  { value: "AUD", name: "Australian Dollars", sign: "$", digital: false },
  { value: "EUR", name: "Euro", sign: "€", digital: false },
  { value: "JPY", name: "Japanese Yen", sign: "¥", digital: false },
  { value: "GBP", name: "British Pound", sign: "£", digital: false },
  { value: "ADA", name: "Cardano", sign: "₳", digital: true },
  { value: "BNB", name: "BNB", sign: "BNB", digital: true },
  { value: "BTC", name: "Bitcoin", sign: "₿", digital: true },
  { value: "DOGE", name: "Dogecoin", sign: "Ð", digital: true },
  { value: "ETH", name: "Ethereum", sign: "Ξ", digital: true },
  { value: "XRP", name: "XRP", sign: "x", digital: true },
  { value: "USDT", name: "Tether", sign: "₮", digital: true },
];

export const digitalCurrencies = Currencies.filter(
  (currency) => currency.digital
);
export const physicalCurrencies = Currencies.filter(
  (currency) => !currency.digital
);

const LeftSide = ({ loading, setLoading }) => {

  const theme = useTheme();
  // change names later?
  const [primaryCurrency, setPrimaryCurrency] = useState("USD");
  const [secondaryCurrency, setSecondaryCurrency] = useState("JPY");

  const [showExchangeRate, setShowExchangeRate] = useState(false)

  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);

  const convert = () => {
    const options = {
      method: "GET",
      url: "http://localhost:8000/convert",
      params: {
        from_currency: primaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: secondaryCurrency,
      },
    };
    axios
      .request(options)
      .then((response) => {
        console.log("response:", response);
        console.log(response.data);
        if (
          response.data[["Realtime Currency Exchange Rate"]] &&
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        ) {
          setLoading(true);
          setExchangeRate(
            response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
          );
          setResult(
            response.data["Realtime Currency Exchange Rate"][
              "5. Exchange Rate"
            ] * amount
          );
          console.log("params:", options);
          console.log("response data:", response.data);
          // console.log("exchangeRate:", exchangeRate);
          // console.log("setResult", result);
        }
      })
      .catch((error) => {
        console.log("currency error from the frontend");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

useEffect(() => {
  if (primaryCurrency !== secondaryCurrency) {
    setShowExchangeRate(true);
/*     convert() */
  } else {
    setShowExchangeRate(false);
  }
}, [primaryCurrency, secondaryCurrency]);



  const formHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("formHandler entered");
  };

  return (
    <Box
      color={theme.palette.text.primary}
    >
      <Box style={{backgroundColor: theme.palette.secondary.main}} className="currency-converter">
        <h2>Currency Converter</h2>
        <p className="forDesktop">
          Please enter an amount, select currencies and press enter
        </p>
        <form onSubmit={formHandler}>
          <div className="column-wrap">
            <div className="column first">
              <p>Amount:</p>
              <Input
                type="number"
                name="currency-amount-1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="column second select-container">
              <InputLabel>From:</InputLabel>
              <select
                value={primaryCurrency}
                name="currency-option-1"
                className="currency-options"
                onChange={(e) => setPrimaryCurrency(e.target.value)}
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
                value={secondaryCurrency}
                name="currency-option-2"
                className="currency-options"
                onChange={(e) => setSecondaryCurrency(e.target.value)}
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
          <Container
            // className="btn-wrap"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem 0",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              id="convert-btn"
              type="submit"
              onClick={convert}
              sx={{
                width: "100%",
                backgroundColor: "#bada55",
                color: "white",
                "&:hover": {
                  backgroundColor: "#82A31A",
                  color: "white",
                },
              }}
            >
              Convert
            </Button>
          </Container>
        </form>
      </Box>
      <Box
        className={`exchange-rate-display ${
          showExchangeRate ? "display" : "hide-on-portrait"
        }`}
      >
        {showExchangeRate && (
          <ExchangeRate
            exchangeRate={exchangeRate}
            primaryCurrency={primaryCurrency}
            secondaryCurrency={secondaryCurrency}
            result={result}
            amount={amount}
            showExchangeRate={showExchangeRate}
          />
        )}
      </Box>
    </Box>
  );
};

export default LeftSide;
