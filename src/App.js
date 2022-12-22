
import {useState, useEffect} from "react"
import { News, LeftSide, ExchangeRate, Loading, LineChart } from "./components";
import styled from "styled-components"



const AppContainer = styled.div`

`


function App() {
  const [loading, setLoading] = useState(false)
  return (
    <>
      {loading && <Loading />}
      <div className="flex">
        <div className="left">
          <LeftSide loading={loading} setLoading={setLoading} />
        </div>
        {/* <News /> */}
        <div className="right">
          <LineChart loading={loading} setLoading={setLoading} />
          {/* <BarChart /> */}
        </div>
      </div>
    </>
  );
}

export default App;
