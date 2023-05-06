import React from "react";
// import { Currencies } from "./LeftSide";
import {Box, Typography} from "@mui/material"
import { useTheme } from "@mui/material/styles";

const ExchangeRate = ({
  exchangeRate,
  primaryCurrency,
  secondaryCurrency,
  Currencies,
  amount,
  result,
}) => {
  const theme = useTheme();
  const roundedExchange = Math.round(exchangeRate * 100) / 100;
  const roundedResult = Math.round(result * 100) / 100;
  const roundedAmount = Math.round(amount * 100) / 100;
  return (
    <Box
      sx={{
        height: '100%',
        borderRadius: {xs: "0", sm: "0"},
      }}
    >
       {
       result !== 0 &&
       (
          <Box
          // className="exchange-rate"
            style={{ backgroundColor: theme.palette.tertiary.main }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              borderRadius: {xs: "0", sm: "0 0 0 16px", },
            }}
          >
            <Typography
              variant= "h6"
              sx={{
                textAlign: "center",
              }}
            >
              Exchange Rate: {roundedExchange}
              <br/>
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

            </Typography>
          </Box>
        )
      }
    </Box>
    );
};

export default ExchangeRate;
