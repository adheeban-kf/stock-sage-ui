import NavBar from "./NavBar";
import Ticker from "./Ticker";
import Result from "./Result";


function App() {
  return (
    <div className="bg-gradient-to-tl from-emerald-400 via-teal-200 to-cyan-100 p-4 min-h-screen">
      <NavBar/>  
      <div className="flex flex-row mx-auto w-full space-x-2 place-content-center">
        <Ticker/>
        <Result/>
      </div> 
    </div>
  );
}

export default App;
