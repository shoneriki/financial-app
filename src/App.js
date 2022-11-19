import './App.css';
import { News, CurrencyConverter, ExchangeRate } from "./components";

function App() {
  return (
    <div className="flex">
      <div className="vertical left">
        <CurrencyConverter />
      </div>
      {/* <News /> */}
    </div>
  );
}

export default App;
