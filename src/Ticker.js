import ChartComponent from "./Chart";
import { useState, useEffect } from "react";


const tickList = ["AAPL", "TATAMOTORS", "HCLINFO", "TATAELXSI"];

function TickerComponent(props) {
  const [ticker, setTicker] = useState("");

  const handleChange = text => {
    props.stateChanger('ticker', text);
  };

  function changeTicker(e) {
    var newTicker = e.target.innerText;
    setTicker("");
    document.getElementById("ticker").value = newTicker
    handleChange(newTicker);
  }

  function searchTicker() {
    var filList = tickList.filter((tick) =>
      tick.startsWith(ticker.toUpperCase())
    );
    return (
      <div className="absolute p-2 gap-2 flex-col rounded-lg bg-white shadow-lg divide-gray-50 text-gray-600 mx-2 z-40">
        {filList.map((tick) => (
          <div
            className="p-2 hover:bg-gray-300"
            onClick={(e) => changeTicker(e)}
          >
            {tick}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <label
        for="ticker"
        className="block mb-2 text-sm font-medium text-emerald-800"
      >
        Ticker
      </label>
      <input
        placeholder="TCS"
        type="text"
        id="ticker"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-800 block w-full p-2.5"
        onChange={(e) => {setTicker(e.target.value); handleChange(e.target.value)}}
      />
      {ticker.length > 0 ? searchTicker() : <div />}
    </div>
  );
}

function CountryComponent(props) {

  const handleChange = event => {
    const text = event.target.value;
    props.stateChanger('market', text);
  };

  return (
    <div className="relative">
      <label
        for="country"
        className="block mb-2 text-sm font-medium text-emerald-800"
      >
        Select a market
      </label>
      <select
        id="country"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-800 block w-full p-2.5"
        onChange={(e) => handleChange(e)}
        defaultValue={"IN"}
      >
        <option selected value="IN">
          India
        </option>
        <option value="US">United States</option>
      </select>
    </div>
  );
}

function TimeRangeComponent(props) {

    const handleChange = event => {
      const text = event.target.value;
      props.stateChanger('range', text);
    };

    return (
      <div className="relative self-end">
        <label
          htmlFor="range"
          className="block mb-2 text-sm font-medium text-emerald-800"
        >
          Range
        </label>
        <select
          id="range"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-800 block w-full p-2.5"
          onChange={(e) => handleChange(e)}
        >
          <option value="7d">1W</option>
          <option value="1mo">1M</option>
          <option selected value="3mo">3M</option>
          <option value="6mo">6M</option>
          <option value="1y">1Y</option>
        </select>
      </div>
    );
  }

export default function Ticker(props) { 
  
  const [graphData, setGraphData] = useState(undefined)
  const [ticker, setTicker] = useState('TCS')
  const [market, setMarket] = useState('in')
  const [range, setRange] = useState('3mo')

  async function getClosePrice(market, ticker, range) {
    await fetch(`http://localhost:8000/closeprice/${market}/${ticker}?range=${range}`)
    .then(response => response.json())
    .then(data => {
      setGraphData(data)
    })
    .catch(() => setGraphData([]))
  }
    
  useEffect(() => {getClosePrice(market, ticker, range); props.setStateToApp(market, ticker, range)} , [market, ticker, range])  

  console.log(ticker)

  let setState = (stateName, value) =>
  {
    if (stateName === 'ticker') {
      setTicker(value)
    }
    else if (stateName === 'market') {
      setMarket(value)
    }
    else if (stateName === 'range') {
      setRange(value)
    }
  }

  return (
    <div className="flex flex-col space-y-5 basis-1/2 py-10 px-10 min-h-full">
      <div className="flex items-stretch bg-white rounded-xl mx-auto p-4 flex-col justify-between space-x-2 space-y-5 shadow-emerald-800 shadow-lg w-5/6 mr-0">
        <CountryComponent stateChanger={setState}/>
        <TickerComponent stateChanger={setState}/>
      </div>
      <div className="flex items-center bg-white rounded-xl mx-auto p-4 flex-col justify-between space-x-2 space-y-10 shadow-emerald-800 shadow-lg w-5/6 mr-0">
        <ChartComponent 
        data={graphData}
        />
        <TimeRangeComponent stateChanger={setState}/>
      </div>
    </div>
  );
}
