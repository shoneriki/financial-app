
import {useState} from "react"
import { News, LeftSide, ExchangeRate, Loading, LineChart } from "./components";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import { Box, Grid, useMediaQuery } from "@mui/material";


function App() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false)
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
           <LeftSide loading={loading} setLoading={setLoading} />
         </Grid>
         <Grid
           item
           name="LineChart-Wrap"
           xs={12}
           sm={6}
           sx={{ display: "flex" }}
         >
           <LineChart loading={loading} setLoading={setLoading} />
         </Grid>
       </Grid>
     </Box>
   );
}

export default App;
