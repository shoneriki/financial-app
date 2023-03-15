
import {useState} from "react"
import { News, LeftSide, ExchangeRate, Loading, LineChart } from "./components";
import styled from "styled-components"


function App() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="flex">
      {loading && <Loading />}
      <div className="left">
        <LeftSide loading={loading} setLoading={setLoading} />
      </div>
      <div className="right">
        <LineChart loading={loading} setLoading={setLoading} />
      </div>
    </div>
  );
}

export default App;
