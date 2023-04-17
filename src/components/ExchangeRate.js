import React from "react";
import { Currencies } from "./LeftSide";

const ExchangeRate = ({
  exchangeRate,
  primaryCurrency,
  secondaryCurrency,
  amount,
  result,
  signHandler,
  showExchangeRate,
}) => {
  const roundedExchange = Math.round(exchangeRate * 100) / 100;
  const roundedResult = Math.round(result * 100) / 100;
  const roundedAmount = Math.round(amount * 100) / 100;
  return (
    <>
      {
       result !== 0 && (
          <div className="exchange-rate">
            <h2>Exchange Rate: {roundedExchange}</h2>
            <h2>
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
            </h2>
          </div>
        )
      }
    </>
    );
};

export default ExchangeRate;
