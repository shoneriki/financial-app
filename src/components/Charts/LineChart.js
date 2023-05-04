import React, { useState } from "react";
import axios from "axios";
import { physicalCurrencies } from "../LeftSide";
import Loading from "../Loading";
import { Line } from "react-chartjs-2";
import dayjs from "dayjs";

import {
  Button,
  Typography,
  Grid,
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
  // eslint-disable-next-line no-unused-vars
  const [
    _dateArray,
    setDateArray
  ] = useState([]);

  /* */
  const [chartData, setChartData] = useState({});

  // const [userData, setUserData] = useState({});
  // const [monthLabels, setMonthLabels] = useState(currentMonths(dayjs()))


  /* */
  const theme = useTheme();


  const getData = async () => {
    // setChartData(null)
    console.log("getData")
    const options = {
      method: "GET",
      url: `https://silk-pale-leek.glitch.me/data`,
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
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 8,
      },
    },
  };

  return (
    <Grid
      name="LineChart-Container"
      style={{backgroundColor: theme.palette.alternate.main}}
      sx={{
        borderRadius: { xs: "0 0 16px 16px", sm: "0 16px 16px 0" },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexGrow: 1,
        flexBasis: "50%",
        flex: 1,
        width: "100%",
      }}
    >
      {loading && <Loading />}
      <Grid
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
            margin: "8px 0",
            fontWeight: "bold",
          }}
        >
          Monthly Exchange Data
        </Typography>
        <Grid
          name="input-wrap"
          component="form"
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Grid
            name="inputContainer-1"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="currency-option-1" sx={{ fontSize: "0.8rem" }}>
              From:
            </label>
            <select
              id="currency-option-1"
              value={firstCurrency}
              onChange={handleFirstCurrencyChange}
              sx={{
                fontSize: "0.5rem",
                padding: "0",
                paddingLeft: "8px", // Adjust the left padding
              }}
            >
              {physicalCurrencies.map((currency, index) => (
                <option key={index} value={currency.value}>
                  {currency.value}
                </option>
              ))}
            </select>
          </Grid>
          <Grid
            name="inputContainer-2"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="currency-option-2" sx={{ fontSize: "0.8rem" }}>
              To:
            </label>
            <select
              id="currency-option-2"
              value={secondCurrency}
              onChange={handleSecondCurrencyChange}
              sx={{
                fontSize: "0.5rem",
                padding: "0",
                paddingLeft: "8px", // Adjust the left padding
              }}
            >
              {physicalCurrencies.map((currency, index) => (
                <option key={index} value={currency.value}>
                  {currency.value}
                </option>
              ))}
            </select>
          </Grid>
        </Grid>
        <Grid
          name="button-wrap"
          sx={{
            margin: "16px 0",
          }}
        >
          <Button
            onClick={chartDataReq}
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              fontSize: ".6rem",
              padding: "8px 16px",
              borderRadius: "16px",
            }}
          >
            Monthly Exchange
          </Button>
        </Grid>
      </Grid>
      <Grid
        sx={{
          width: "100%",
          height: "calc(100% - 150px)",
          overflow: "hidden",
          position: "relative",
          flexGrow: 1,
        }}
      >
        <Grid
          style={{ width: "100%", height: "100%" }}
          name="LineChart-Container"
        >
          <Line data={currencyData} options={chartOptions} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LineChart;
