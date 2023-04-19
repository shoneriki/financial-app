
import {useState} from "react"
import { News, LeftSide, ExchangeRate, Loading, LineChart } from "./components";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import {Box, Grid} from "@mui/material"


function App() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false)
  return (
    <Box
      // className="flex"
      style={{ color: theme.palette.text.primary }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderRadius: "16px",
        height: "100%",
        width: '100%',
        // width: {xs: "90vw", sm: "80vw"},
        // height: {xs: "50vh", sm: "60vh"},
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
      }}
    >
      {loading && <Loading />}
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid item xs={12} sm={6} sx={{ display: "flex", height: {xs: "66%", sm: "100%"} }}>
          <LeftSide loading={loading} setLoading={setLoading} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: "flex",
            height: '100%',
            backgroundColor: theme.palette.alternate.main,
            borderRadius: { xs: "0 0 16px 16px", sm: "0 16px 16px 0" },
            width: {sx: "100%", sm: "calc(100% - 150px)"},
            overflow: "hidden",
            position: "relative",
          }}
        >
          <LineChart loading={loading} setLoading={setLoading} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
