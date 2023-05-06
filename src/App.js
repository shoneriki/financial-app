import {useState} from "react"
import {  LeftSide, Loading, LineChart } from "./components";
import { useTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";


function App() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false)

  const Currencies = [
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

  const digitalCurrencies = Currencies.filter(
    (currency) => currency.digital
  );
  const physicalCurrencies = Currencies.filter(
    (currency) => !currency.digital
  );
  console.log("physicalCurrencies", physicalCurrencies)

   return (
     <Box
       name="App"
       style={{ color: theme.palette.text.primary }}
       sx={{
         display: "flex",
         flexDirection: "column",
         borderRadius: "16px",
         height: "100%",
         width: "100%",
         boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
         fontFamily: "Roboto",

         "@media (min-width: 600px) and (orientation: landscape)": {
           flexDirection: "row",
         },

         "@media (min-width: 768px)": {
           flexDirection: "row",
         },
       }}
     >
       {loading && <Loading />}
       <Grid container name="LeftSide=LineChart-Container" sx={{ flexGrow: 1 }}>
         <Grid
           item
           name="LeftSide-Wrap"
           xs={12}
           sm={6}
           sx={{
             display: "flex",
             borderRadius: { xs: "16px 16px 0 0", sm: "16px 0 0 16px" },
             width: "100%",
             height: "100%",
             padding: "0",
             margin: "0",
           }}
         >
           <LeftSide
             Currencies={Currencies}
             digitalCurrencies={digitalCurrencies}
             physicalCurrencies={physicalCurrencies}
             loading={loading}
             setLoading={setLoading}
           />
         </Grid>
         <Grid
           item
           name="LineChart-Wrap"
           xs={12}
           sm={6}
           sx={{
             display: "flex",
             flexGrow: "1",
             width: "100%",
             height: "100%",
           }}
         >
           <LineChart
             physicalCurrencies={physicalCurrencies}
             loading={loading}
             setLoading={setLoading}
           />
         </Grid>
       </Grid>
     </Box>
   );
}

export default App;
