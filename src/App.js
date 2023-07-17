import NavBar from "./NavBar";
import Ticker from "./Ticker";
import Info from "./Info";
import { useState, useEffect } from "react";


function App() {
  const [ticker, setTicker] = useState('TCS')
  const [market, setMarket] = useState('in')
  const [range, setRange] = useState('3mo')
  const[infoData, changeInfoData] = useState({})

  async function getInfo(market, ticker) {
    await fetch(`http://localhost:8000/info/${market}/${ticker}`)
    .then(response => response.json())
    .then(data => {
       changeInfoData(data)
    })
    .catch(() => changeInfoData({}))
  }

  useEffect(() => {getInfo(market, ticker);} , [market, ticker])  

  const setStateToApp = (market, ticker, range) => {
    setTicker(ticker);
    setMarket(market);
    setRange(range);
  }

  return (
    <div className="bg-gradient-to-tl from-emerald-400 via-teal-200 to-cyan-100 p-4 min-h-screen">
      <NavBar/>  
      <div className="flex flex-row mx-auto w-full space-x-2 place-content-center">
        <Ticker setStateToApp={setStateToApp}/>
        <Info data={infoData} ticker={ticker}/>
      </div> 
    </div> 
  );
}

export default App;
