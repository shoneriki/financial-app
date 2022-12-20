import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import styled from "styled-components"
import CurrencyConverter from "./CurrencyConverter";

import ExchangeRate from "./ExchangeRate";

// export const outdatedCurrenciesState = {
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

const LeftSideCurrency = ({ loading, setLoading }) => {


  // change names later?
  const [primaryCurrency, setPrimaryCurrency] = useState("USD");
  const [secondaryCurrency, setSecondaryCurrency] = useState("JPY");

  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [result, setResult] = useState(0);

  //Styled Components

  const CurrencyHeight= '30vh'

  const LeftSideWrapper = styled.div`
    @media only screen and (max-width: 667px) {
      display: flex;
      flex-direction: column;
      height: ${CurrencyHeight};
      width: 100%;
    }
  `;

  //Styled Components end





  return (
    <LeftSideWrapper>
      <CurrencyConverter
        amount={amount}
        setAmount={setAmount}
        primaryCurrency={primaryCurrency}
        setPrimaryCurrency={setPrimaryCurrency}
        secondaryCurrency={secondaryCurrency}
        setSecondaryCurrency={setSecondaryCurrency}
        result={result}
        setExchangeRate={setExchangeRate}
        loading={loading}
        setLoading={setLoading}
      />
      <ExchangeRate
        exchangeRate={exchangeRate}
        primaryCurrency={primaryCurrency}
        secondaryCurrency={secondaryCurrency}
        result={result}
        amount={amount}
      />
    </LeftSideWrapper>
  );
};

export default LeftSideCurrency;
