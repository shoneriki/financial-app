
import {useState, useEffect} from "react"
import './App.css';
import { News, CurrencyConverter, ExchangeRate, Loading, LineChart } from "./components";

import BarChart from "./components/Charts/BarChart"
import {UserData} from "./utils/Data"

import logo from './logo.svg';
import './App.css';


function App() {
  const [loading, setLoading] = useState(false)


  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 5000);
  // }, []);

  /* */
const months = Array.from({ length: 12 }, (item, i) => {
  return new Date(0, i).toLocaleString("en-US", { month: "long" });
});
  const [userData, setUserData] = useState({
    labels: months.map((data) => data),
    // labels: labels,
    datasets: [{
      label: "Exchange Rate 2022",
      data: UserData.map((data) => data.userGain),
    }]
  })

  /* */
  return (
    <div className="body">
      {loading && <Loading />}
      <div className="flex">
        <div className="vertical left">
          <CurrencyConverter loading={loading} setLoading={setLoading} />
        </div>
        {/* <News /> */}
        <div className="right">
          <LineChart loading={loading} setLoading={setLoading} />
          {/* <BarChart chartData={userData} /> */}
        </div>
      </div>

    </div>
  );
}

export default App;
