import {useState, useEffect} from "react"
import './App.css';
import { News, CurrencyConverter, ExchangeRate, Loading, LineChart } from "./components";


function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="body">
      <div className="flex">
        <div className="vertical left">
          <CurrencyConverter />
        </div>
        {/* <News /> */}
        <LineChart/>

      </div>
    </div>
  );
}

export default App;
