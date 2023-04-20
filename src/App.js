
import {useState} from "react"
import { News, LeftSide, ExchangeRate, Loading, LineChart } from "./components";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, useMediaQuery } from "@mui/material";


function App() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false)
// const useDeviceSpecificFlexDirection = () => {
//   const isLandscape = useMediaQuery(
//     "(min-width: 600px) and (orientation: landscape)"
//   );
//   const isIPhoneSELandscape = useMediaQuery(
//     "(device-width: 667px) and (device-height: 375px) and (orientation: landscape)"
//   );
//   const isIPadPortrait = useMediaQuery(
//     "(device-width: 820px) and (device-height: 1180px) and (orientation: portrait)"
//   );

//   return isLandscape || isIPhoneSELandscape || isIPadPortrait
//     ? "row"
//     : "column";
// };

// const flexDirection = useDeviceSpecificFlexDirection();
   return (
     <Box
       style={{ color: theme.palette.text.primary }}
       sx={{
         display: "flex",
         flexDirection: "column",
         borderRadius: "16px",
         height: "100%",
         width: "100%",
         boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",

         "@media (min-width: 600px) and (orientation: landscape)": {
           flexDirection: "row",
         },

         "@media (min-width: 768px)": {
           flexDirection: "row",
         },
       }}
     >
       {loading && <Loading />}
       <Grid container sx={{ flexGrow: 1 }}>
         <Grid
           item
           xs={12}
           sm={6}
           sx={{ display: "flex", height: { xs: "66%", sm: "100%" } }}
         >
           <LeftSide loading={loading} setLoading={setLoading} />
         </Grid>
         <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
           <LineChart loading={loading} setLoading={setLoading} />
         </Grid>
       </Grid>
     </Box>
   );
}

export default App;
