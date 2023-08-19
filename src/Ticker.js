import ChartComponent from "./Chart";
import { useState, useEffect } from "react";

function TickerComponent(props) {
  const [filList, setfilList] = useState([])
  const [tempTicker, setTempTicker] = useState("");
  const [activeCountry, setActiveCountry] = useState("in");

  const handleSubmit = () => {
    var text = document.getElementById("ticker").value.trim()
    props.stateChanger('ticker', text);
    props.stateChanger('market', activeCountry);
  };

  function changeTempTicker(e) {
    var newTicker = e.target.getAttribute('t-key');
    setfilList([]);
    document.getElementById("ticker").value = newTicker
  }

    async function getFilList(market, tickerSearch) {
      if (tickerSearch.length > 0) {
      console.log(market);
      // var country = market.toLowerCase() === 'in' ? 'India' : 'United States';
      await fetch(`http://localhost:8000/search/${activeCountry}/${tickerSearch}`)
      .then(response => response.json())
      .then(data => {
        setfilList(data);
      })
      .catch(() => {setfilList([])})
      }
      else {
        setfilList([]);
      }
    }

  useEffect(() => {getFilList(props.market, tempTicker);} , [tempTicker])  

  return (
    <form className="flex flex-col gap-1" onSubmit={(e) => {handleSubmit(); e.preventDefault()}}>
      <label
        for="country"
        className="block mb-2 text-sm font-medium text-sky-800"
      >Country</label>
      <ul className="grid grid-flow-col bg-gray-100 rounded-xl p-1 border text-sm font-semibold w-1/2 mb-3">
          <li id="in" 
          onClick={() => setActiveCountry("in")} 
          className={`${activeCountry ===  "in" ? 
                      'text-white  bg-sky-700' : 
                      'text-gray-500 hover:bg-gray-300'} 
                      text-center rounded-xl m-1`}>
              <a className="flex justify-center py-1">India</a>
          </li>
          <li id="us" 
          onClick={() => setActiveCountry("us")} 
          className={`${activeCountry ===  "us" ? 
                      'text-white  bg-sky-700' : 
                      'text-gray-500 hover:bg-gray-300'} 
                      text-center rounded-xl m-1`}>
              <a className="flex justify-center py-1">United States</a>
          </li>
      </ul>
      <label
        for="ticker"
        className="block mb-2 text-sm font-medium text-sky-800"
      >
        Ticker
      </label>
      <div className="relative">
        <input
          placeholder="TCS"
          type="text"
          id="ticker"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:ring-2 focus:border-sky-800 block w-full p-2.5"
          onChange={(e) => {setTempTicker(e.target.value);}}
        />
        <div className="absolute p-2 gap-2 flex-col rounded-lg bg-white shadow-lg divide-gray-50 text-gray-600 mx-2 z-40">
        {filList ? filList.map((tick) => (
          <div
            className="p-2 hover:bg-gray-300"
            key={tick.ticker}
            t-key={tick.ticker.replace('.NS','')}
            onClick={(e) => changeTempTicker(e)}
          >
            {tick.longname} - {tick.exchDisp}
          </div> 
        )): <div/>}
      </div>
      </div>
      <button type="submit" className="bg-sky-700 text-white text-sm rounded-xl py-2 px-4 mt-4 w-1/3 focus:bg-sky-800 focus:ring-2 focus:ring-sky-500">
        Submit to サ
      </button>
    </form>
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
          className="block mb-2 text-sm font-medium text-sky-800"
        >
          Range
        </label>
        <select
          id="range"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:ring-2 focus:border-sky-800 block w-full p-2.5"
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
  const [ticker, setTicker] = useState('')
  const [market, setMarket] = useState('in')
  const [range, setRange] = useState('3mo')

  async function getClosePrice(market, ticker, range) {
    if (ticker !== "") {
    await fetch(`http://localhost:8000/closeprice/${market}/${ticker}?range=${range}`)
    .then(response => response.json())
    .then(data => {
      setGraphData(data)
    })
    .catch(() => setGraphData([]))
    }
    else {
      setGraphData({})
    }
  }
    
  useEffect(() => {getClosePrice(market, ticker, range); props.setStateToApp(market, ticker, range)} , [market, ticker, range])  

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
    <div className="flex flex-col space-y-5 basis-1/2 py-10 px-10 justify-center">
      <div className="flex items-stretch bg-white rounded-xl mx-auto p-4 flex-col justify-between space-x-2 space-y-5 shadow-sky-800 shadow-lg w-5/6 mr-0">
        <TickerComponent stateChanger={setState} market={market}/>
      </div>
      <div className="flex items-center bg-white rounded-xl mx-auto p-4 flex-col justify-between space-x-2 space-y-10 shadow-sky-800 shadow-lg w-5/6 mr-0">
        <ChartComponent 
        data={graphData}
        />
        <TimeRangeComponent stateChanger={setState}/>
      </div>
    </div>
  );
}
