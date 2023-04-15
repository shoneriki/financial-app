import React from "react";
import { Currencies } from "./LeftSide";

const ExchangeRate = ({
  exchangeRate,
  primaryCurrency,
  secondaryCurrency,
  amount,
  result,
  signHandler,
}) => {
  const roundedExchange = Math.round(exchangeRate * 100) / 100;
  const roundedResult = Math.round(result * 100) / 100;
  const roundedAmount = Math.round(amount * 100) / 100;
  return (
      <div className="exchange-rate-display">
      {(result !== 0) | null && exchangeRate !== 0 ? (
        <div className="exchange-rate">
            <h3>Exchange Rate: {roundedExchange}</h3>
            <h3>
              {Currencies.map((currency) => {
                if (currency.value === primaryCurrency) {
                  return currency.sign;
                }
              })}
              {roundedAmount} ={" "}
              {Currencies.map((currency) => {
                if (currency.value === secondaryCurrency) {
                  return currency.sign;
                }
              })}
              {roundedResult}
            </h3>
        </div>
      ) : null}
      </div>
  );
};

export default ExchangeRate;
