import {useState, useEffect} from "react"
import './App.css';
import { News, CurrencyConverter, ExchangeRate, Loading, LineChart } from "./components";


function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 5000);
  }, []);

  return (
    <div className="body">
      {loading && <Loading />}
      <div className="flex">
        <div className="vertical left">
          <CurrencyConverter loading={loading} setLoading={setLoading} />
        </div>
        {/* <News /> */}
        <LineChart loading={loading} setLoading={setLoading} />
      </div>
    </div>
  );
}

export default App;
