import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {Button, Container, Box,Grid, Input, FormControl, InputLabel, Select, MenuItem, TextField, NativeSelect, OutlinedInput, Autocomplete, Typography} from '@mui/material'

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
    <Grid
      name="LeftSide-Container"
      color={theme.palette.text.primary}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "0",
        margin: "0",
      }}
    >
      <Grid
        name="CurrencyConverter-Container"
        style={{ backgroundColor: theme.palette.secondary.main }}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: "100%",
          height: "50%",
          padding: "16px",
          margin: "0",
          borderRadius: { xs: "16px 16px 0 0",sm: "16px 0 0 0",md: "16px 0 0 0", lg: "16px 0 0 0 " },
          textAlign: "center",
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            margin: "0",
          }}
        >
          Currency Converter
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "inline-flex",
            },
            fontSize: ".8rem",
          }}
        >
          please enter value and currencies and press enter
        </Typography>
        <form
          onSubmit={formHandler}
          sx={{
            width: "100%",
          }}
        >
          <Grid
            name="inputsForm"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: "100%",
              height: "100%",
            }}
          >
            <FormControl
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                margin: "0",
                padding: "0",
                width: "33%",
                fontSize: "16px",
              }}
            >
              <Grid
                name="currencyConverter-input1"
                sx={{
                  display:'flex',
                  flexDirection: "column",
                  width: "100%",
                  fontSize: '0.8rem',
                  textAlign: 'center',
                }}
              >
                <label htmlFor="amount" sx={{ fontSize: "0.3rem" }}>
                  Amount:
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ textAlign: "center"}}
                />
              </Grid>
            </FormControl>
            <FormControl sx={{ width: "33%" }}>
              <Grid
                name="currencyConverter-input2"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  fontSize: '.8rem',
                }}
              >
                <label htmlFor="currency-option-1" sx={{ fontSize: "0.8rem" }}>
                  From:
                </label>
                <select
                  id="currency-option-1"
                  value={primaryCurrency}
                  onChange={(e) => setPrimaryCurrency(e.target.value)}
                  sx={{
                    fontSize: "0.5rem",
                    padding: "0",
                    paddingLeft: "8px",
                  }}
                >
                  {Currencies.map((currency, index) => (
                    <option key={index} value={currency.value}>
                      {currency.value}
                    </option>
                  ))}
                </select>
              </Grid>
            </FormControl>
            <FormControl sx={{ width: "33%" }}>
              <Grid
                name="currencyConverter-input3"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  fontSize: ".8rem",
                }}
              >
                <label htmlFor="currency-option-2" sx={{ fontSize: "0.8rem" }}>
                  To:
                </label>
                <select
                  id="currency-option-2"
                  value={secondaryCurrency}
                  onChange={(e) => setSecondaryCurrency(e.target.value)}
                  sx={{
                    fontSize: "0.5rem",
                    padding: "0",
                    paddingLeft: "8px",
                  }}
                >
                  {physicalCurrencies.map((currency, index) => (
                    <option key={index} value={currency.value}>
                      {currency.value}
                    </option>
                  ))}
                </select>
              </Grid>
            </FormControl>
          </Grid>
          <Grid
            name="button-Container"
            sx={{
              width: "100%",
              display: {
                xs: "flex",
                sm: "flex",
                md: "flex",
                lg: "none",
              },
              justifyContent: "center",
              alignItems: "center",
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
                padding: "0",
                fontSize: "0.6rem",
                borderRadius: "16px",
                "&:hover": {
                  backgroundColor: "#82A31A",
                },
              }}
            >
              Convert
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid
        name="ExchangeRate-Wrap"
        sx={{
          height: "50%",
          borderRadius: { xs: "0", sm: "0 0 0 16px", md: "0 0 0 16px", lg: "0 0 0 16px", },
        }}
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
      </Grid>
    </Grid>
  );
};

export default LeftSide;
