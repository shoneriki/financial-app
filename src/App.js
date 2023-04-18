
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
      className="flex"
    >
      {loading && <Loading />}
      <div className="left">
        <LeftSide loading={loading} setLoading={setLoading} />
      </div>
      <div className="right">
        <LineChart loading={loading} setLoading={setLoading} />
      </div>
    </Box>
  );
}

export default App;
