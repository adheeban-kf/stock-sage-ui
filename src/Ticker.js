import { useState } from "react";
import ChartComponent from "./Chart";

const tickList = ["AAPL", "TATAMOTORS", "HCLINFO", "TATAELXSI"];

function TickerComponent() {
  const [ticker, setTicker] = useState("");

  function changeTicker(e) {
    var newTicker = e.target.innerText;
    setTicker("");
    document.getElementById("ticker").value = newTicker;
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
        onChange={(e) => setTicker(e.target.value)}
      />
      {ticker.length > 0 ? searchTicker() : <div />}
    </div>
  );
}

function CountryComponent() {
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
      >
        <option selected value="IN">
          India
        </option>
        <option value="US">United States</option>
      </select>
    </div>
  );
}

function TimeRangeComponent() {
    return (
      <div className="relative">
        <label
          for="range"
          className="block mb-2 text-sm font-medium text-emerald-800"
        >
          Select range
        </label>
        <select
          id="range"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-800 block w-full p-2.5"
        >
          <option selected value="1M">1M</option>
          <option value="3M">3M</option>
          <option value="6M">6M</option>
          <option value="1Y">1Y</option>
        </select>
      </div>
    );
  }

export default function Ticker() { 
  return (
    <div className="flex flex-col space-y-5 basis-1/2 py-10 px-10">
      <div className="flex items-stretch bg-white rounded-xl mx-auto p-4 flex-col justify-between space-x-2 space-y-5 shadow-xl w-5/6 mr-0">
        <CountryComponent />
        <TickerComponent />
      </div>
      <div className="flex items-center bg-white rounded-xl mx-auto p-4 flex-col justify-between space-x-2 space-y-10 shadow-xl w-5/6 mr-0">
        <ChartComponent />
        <TimeRangeComponent/>
      </div>
    </div>
  );
}
