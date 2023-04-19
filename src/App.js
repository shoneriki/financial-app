
import {useState} from "react"
import { News, LeftSide, ExchangeRate, Loading, LineChart } from "./components";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import {Box} from "@mui/material"


function App() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false)
  return (
    <Box
      // className="flex"
      style={{color: theme.palette.text.primary}}
      sx={{
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        borderRadius: '16px',
        width: '100%',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.4)',
      }}
    >
      {loading && <Loading />}
      <Box
        // className="left"
        sx={{
          display: "flex",
          flexDirection: {xs: 'column', sm: 'row'},
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: { xs: '100%', sm: '50%'},
        }}
      >
        <LeftSide loading={loading} setLoading={setLoading} />
      </Box>
      <Box
        // className="right"
        style={{ backgroundColor: theme.palette.alternate.main }}
        sx={{
          height: "100%",
          width: {xs: '100%', sm: '50%'},
          borderRadius: {xs: "0 0 16px 16px", sm: "0 16px 16px 0"},
          padding: "0",
          margin: "0",

        }}
      >
        <LineChart loading={loading} setLoading={setLoading} />
      </Box>
    </Box>
  );
}

export default App;
