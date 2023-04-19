import React, { useState } from "react";
import axios from "axios";
import { Currencies, digitalCurrencies, physicalCurrencies } from "../LeftSide";
import { ExchangeRate } from "../ExchangeRate";
import Loading from "../Loading";
import Data from "../../utils/Data";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

import {
  Button,
  Box,
  Container,
  Typography,
  FormControl,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


const LineChart = ({ loading, setLoading }) => {
  const [firstCurrency, setFirstCurrency] = useState("USD");
  const [secondCurrency, setSecondCurrency] = useState("JPY");

  const [dataArray, setDataArray] = useState([]);
  const [dateArray, setDateArray] = useState([]);

  /* */
  const [chartData, setChartData] = useState({});

  // const [userData, setUserData] = useState({});
  // const [monthLabels, setMonthLabels] = useState(currentMonths(dayjs()))


  /* */



  const getData = async () => {
    // setChartData(null)
    const options = {
      method: "GET",
      url: "http://localhost:8000/data",
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
    await axios
      .request(options)
      .then((response) => {
        console.log("response:", response);
        let responseDataObj = response.data["Time Series FX (Monthly)"];
        console.log("responseDataObj", responseDataObj);

        let tempDataArray = [];
        let tempDateArray= [];

        // let properDataArray = tempDataArray.reverse();

        for (const date in responseDataObj) {
          if(dayjs(date).isAfter(dayjs().subtract(1, 'year'))){
          // if (date.includes("2022")) {
            tempDateArray.push(date)
            let valueObj = responseDataObj[date];
            tempDataArray.push(valueObj["4. close"]);
          }
        }
        setDateArray(tempDateArray)

        console.log("new array or dataArray", dataArray);
        console.log("tempDataArray", tempDataArray);
        setDataArray(tempDataArray.reverse());

        // const months = Array.from({ length: 12 }, (item, i) => {
        //   return new Date(0, i).toLocaleString("en-US", { month: "long" });
        // });

        setChartData(dataArray);

        console.log("chartData", chartData);
      })
      .catch((error) => {
        console.log("linechart error from the frontend");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const chartDataReq = () => {
    setLoading(true)
    getData();
  };

   const handleFirstCurrencyChange = (event) => {
    setDataArray([])
    setFirstCurrency(event.target.value);

    //  chartDataReq();
   };

   const handleSecondCurrencyChange = (event) => {
     setDataArray([])
     setSecondCurrency(event.target.value);
    //  chartDataReq();
   };

  // const months = Array.from({ length: 12 }, (item, i) => {
  //   return new Date(0, i).toLocaleString("en-US", { month: "long" });
  // });
  const currentMonths = (currentDate) => {
    let monthsArray = []

    for (let i = 0; i < 12; i++) {
      monthsArray.push(currentDate.format("MMM"))
      currentDate = currentDate.add(1, "month")
    }
    return monthsArray
  }

  let currencyData = {
    // labels: months.map((month) => month),
    labels: currentMonths(dayjs()),
    datasets: [
      {
        label: `Monthly Currency Exchange : ${firstCurrency} - ${secondCurrency}`,
        data: dataArray.map((exchange) => exchange),
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 5,
        tension: 0.1,
      },
    ],
  };

  var chartOptions = {
    maintainAspectRatio: true,
    scales: {},
    legend: {
      labels: {
        fontSize: 8,
      },
    },
  };

  return (
    <Box
      // className="lineChart-wrap"
      sx={{
        borderRadius: { xs: "0 0 16px 16px", sm: "0 16px 16px 0" },
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      {loading && <Loading />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          margin: "0",
          padding: "0",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            margin: "16px 0",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Monthly Exchange Data
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <TextField
            id="currency-option-1"
            select
            label="From"
            value={firstCurrency}
            onChange={handleFirstCurrencyChange}
            sx={{
              textAlign: "center",
              "& .MuiInputBase-input": {
                fontSize: "0.5rem",
                padding: "0",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.8rem",
              },
            }}
          >
            {physicalCurrencies.map((currency, index) => (
              <MenuItem
                key={index}
                value={currency.value}
                sx={{
                  fontSize: "0.5rem",
                }}
              >
                {currency.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="currency-option-1"
            select
            label="From"
            value={secondCurrency}
            onChange={handleSecondCurrencyChange}
            sx={{
              textAlign: "center",
              "& .MuiInputBase-input": {
                fontSize: "0.5rem",
                padding: "0",
              },
              "& .MuiInputLabel-root": {
                fontSize: "0.8rem",
              },
            }}
          >
            {physicalCurrencies.map((currency, index) => (
              <MenuItem
                key={index}
                value={currency.value}
                sx={{
                  fontSize: "0.5rem",
                }}
              >
                {currency.value}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box className="row second-row">
          <Button
            onClick={chartDataReq}
            variant="contained"
            color="primary"
            type="submit"
          >
            Monthly Exchange
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Line
          data={currencyData}
          options={chartOptions}

        />
      </Box>
    </Box>
  );
};

export default LineChart;
