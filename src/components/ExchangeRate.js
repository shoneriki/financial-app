import React from "react";
import { Currencies } from "./CurrencyConverter";

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
    <div className="exchange-rate">
      {(result !== 0) | null && exchangeRate !== 0 ? (
        <div className="exchange-amount-div">
          <h3>Exchange Rate: {roundedExchange}</h3>
          <p>
            {Currencies.map((currency) => {
              if(currency.value === primaryCurrency) {
                return currency.sign
              }
            })}{roundedAmount}
            = {
              Currencies.map((currency) => {
                if(currency.value === secondaryCurrency) {
                  return currency.sign
                }
              })
            }{roundedResult}
          </p>
        </div>
      ) : null}
      {/* <p>
        {primaryCurrency} to {secondaryCurrency}
      </p> */}
    </div>
  );
};

export default ExchangeRate;
