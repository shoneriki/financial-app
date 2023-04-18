import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {Button, Container, Box, Input, FormControl, InputLabel, Select, MenuItem, Typography} from '@mui/material'

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        style={{ backgroundColor: theme.palette.secondary.main }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          margin: "0",
          padding: "0",
          width: "100%",
          borderRadius: "16px 0 0 0",
          flexGrow: 1,
        }}
      >
        <h2>Currency Converter</h2>
        <p className="forDesktop">
          Please enter an amount, select currencies and press enter
        </p>
        <form
          onSubmit={formHandler}
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
              height: '50%',
            }}
          >
            <FormControl
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center',
                margin: '0',
                padding: '0',
                width: '33%',
                flexGrow: 1,
              }}
            >
              <InputLabel
                htmlFor="currency-amount-1"
                sx={{
                  fontSize: '.8rem',
                }}
              >
                Amount:
              </InputLabel>
              <Input
                id="currency-amount-1"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{
                  width: '50%',
                  border: 'none',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              />
            </FormControl>
            <FormControl
              sx={{
                width: "33%",
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
                margin: '0',
              }}
            >
              <InputLabel
                htmlFor="currency-option-1"
                sx={{
                  fontSize: ".8rem",
                  padding: '0',
                  margin: '0',

                }}
              >
                From:
              </InputLabel>
              <Select
                id="currency-option-1"
                value={primaryCurrency}
                onChange={(e) => setPrimaryCurrency(e.target.value)}
                sx={{
                  fontSize: ".6rem",
                  padding: '0',
                  margin: '0',
                }}
              >
                {Currencies.map((currency, index) => (
                  <MenuItem
                    key={index}
                    value={currency.value}
                    sx={{
                      fontSize: ".5rem",
                    }}
                  >
                    {currency.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{
                width: "33%",
                flexGrow: 1,
                fontSize: ".6rem",
              }}
            >
              <InputLabel
                htmlFor="currency-option-2"
                sx={{
                  fontSize: ".8rem",
                }}
              >
                To:
              </InputLabel>
              <Select
                id="currency-option-2"
                value={secondaryCurrency}
                onChange={(e) => setSecondaryCurrency(e.target.value)}
                sx={{
                  fontSize: ".6rem",
                }}
              >
                {physicalCurrencies.map((currency, index) => (
                  <MenuItem
                    key={index}
                    value={currency.value}
                    sx={{
                      fontSize: ".5rem"
                    }}
                  >
                    {currency.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box
            // className="btn-wrap"
            sx={{
              width: "100%",
              display: "flex",
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
                color: "white",
                "&:hover": {
                  backgroundColor: "#82A31A",
                  color: "white",
                },
              }}
            >
              Convert
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        className={`exchange-rate-display ${
          showExchangeRate ? "display" : "hide-on-portrait"
        }`}
        sx={{
          flexGrow: 1,
          height: '50%',
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
      </Box>
    </Box>
  );
};

export default LeftSide;
