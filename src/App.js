
import {useState, useEffect} from "react"
import './App.css';
import { News, CurrencyConverter, ExchangeRate, Loading, LineChart } from "./components";

import BarChart from "./components/Charts/BarChart"
import {UserData} from "./utils/Data"
import './App.css';


function App() {
  const [loading, setLoading] = useState(false)
  return (
    <div className="body">
      {loading && <Loading />}
      <div className="flex">
        <div className="left">
          <CurrencyConverter loading={loading} setLoading={setLoading} />
        </div>
        {/* <News /> */}
        <div className="right">
          <LineChart loading={loading} setLoading={setLoading} />
          {/* <BarChart /> */}
        </div>
      </div>

    </div>
  );
}

export default App;
