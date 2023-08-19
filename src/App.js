import NavBar from "./NavBar";
import Ticker from "./Ticker";
import Info from "./Info";
import Hero from "./Hero";
import Insights from "./Insights";
import { useState, useEffect } from "react";

const bgStyle = {
  'background-color': 'rgb(186, 230, 253)',
  'background-image': 'radial-gradient(at 65% 70%, rgb(30, 64, 175) 0, transparent 61%), radial-gradient(at 1% 12%, rgb(7, 89, 133) 0, transparent 98%), radial-gradient(at 74% 37%, rgb(31, 41, 55) 0, transparent 77%), radial-gradient(at 14% 56%, rgb(37, 99, 235) 0, transparent 66%), radial-gradient(at 32% 75%, rgb(125, 211, 252) 0, transparent 90%), radial-gradient(at 44% 90%, rgb(132, 204, 22) 0, transparent 79%)'
}


function App() {

  document.title = "StockSage"

  const [ticker, setTicker] = useState('')
  const [market, setMarket] = useState('in')
  const [range, setRange] = useState('3mo')
  const[infoData, changeInfoData] = useState({})

  async function getInfo(market, ticker) {
    if (ticker !== "") {
    await fetch(`http://localhost:8000/info/${market}/${ticker}`)
    .then(response => response.json())
    .then(data => {
       changeInfoData(data)
    })
    .catch(() => changeInfoData({}))
  }
  else {
    changeInfoData({})
  }
  }

  useEffect(() => {getInfo(market, ticker);} , [market, ticker])  

  const setStateToApp = (market, ticker, range) => {
    setTicker(ticker);
    setMarket(market);
    setRange(range);
  }

  return (
    <div style={bgStyle} className="overflow-none">
      <div className="snap-y snap-proximity overflow-auto h-screen w-screen scroll-smooth">
        <NavBar/>
        <div className="p-4 min-h-screen snap-center shrink-0 bg-black" id="slide-1">
          <div className="flex flex-row mx-auto w-full space-x-2 min-h-screen justify-center items-center">
            <Hero/>
          </div> 
        </div> 
        <div className="p-4 min-h-screen snap-center shrink-0 pt-10" id="slide-2">
          <div className="flex flex-row mx-auto w-full space-x-2 place-content-center min-h-screen justify-items-center pt-10">
            <Ticker setStateToApp={setStateToApp}/>
            <Info data={infoData} market={market}/>
          </div> 
        </div> 
        <div className="p-4 min-h-screen snap-center shrink-0 pt-10" id="slide-3">
          <div className="flex flex-row mx-auto w-full space-x-2 place-content-center min-h-screen justify-items-center pt-10">
            <Insights market={market} ticker={ticker}/>
          </div> 
        </div> 
      </div>
    </div>
  );
}

export default App;
