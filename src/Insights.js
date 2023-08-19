import { useState, useEffect } from "react";
import LoaderAnimation from "./Misc";
const tabList = ["Financials", "Balance Sheet", "Cash Flow", "Overall"] //"Income Statement",
const subTabList = ["Insights","Data",]


const Insights = (props) => {
    const [activeTab, setActiveTab] = useState('overall');
    const [activeSubTab, setActiveSubTab] = useState('Insights');
    const [data, setData] = useState({});
    const [insights, setInsights] = useState('');

    async function getData(market, infotype, ticker) {
        await fetch(`http://localhost:8000/infodata/${market}/${infotype}/${ticker}`)
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
        .catch(() => {setData({})})
      }

    async function getInsights(market, infotype, ticker) {
        await fetch(`http://localhost:8000/insights/${market}/${infotype}/${ticker}`)
        .then(response => response.json())
        .then(info => {
            setInsights(info);
        })
        .catch(() => {setInsights('')})
      }

    async function getOpinion(market, ticker) {
        await fetch(`http://localhost:8000/overallopinion/${market}/${ticker}`)
        .then(response => response.json())
        .then(info => {
            setInsights(info);
        })
        .catch(() => {setInsights('')})
      }
    
    useEffect(() => {if (activeSubTab == 'Data') getData(props.market, activeTab, props.ticker);} , [props.market, activeTab, props.ticker, activeSubTab])  
    useEffect(() => {setInsights(''); if (activeSubTab == 'Insights' && activeTab !== 'overall') getInsights(props.market, activeTab, props.ticker);} , [props.market, activeTab, props.ticker, activeSubTab])  
    useEffect(() => {setInsights(''); if (activeSubTab == 'Insights' && activeTab === 'overall') getOpinion(props.market, props.ticker);} , [props.market, activeTab, props.ticker, activeSubTab])  

    return (
        <div className="flex flex-row basis-11/12 justify-center py-auto px-10">
            <div className="flex flex-col bg-white rounded-xl mx-auto p-4 justify-between space-y-1 shadow-sky-800 shadow-lg w-full ml-0 min-h-max mt-16 mb-10 place-items-center">
                <ul className="grid grid-flow-col bg-gray-100 rounded-full p-1 border text-sm font-semibold w-5/6">
                    {tabList.map(tab => 
                    <li id={tab.replace(" ","").toLowerCase()} 
                    onClick={() => setActiveTab(tab.replace(" ","").toLowerCase())} 
                    className={`${activeTab ===  tab.replace(" ","").toLowerCase() ? 
                                'text-white shadow bg-sky-700' : 
                                'text-gray-500 hover:bg-gray-300'} 
                                text-center rounded-full m-1`}>
                        <a className="flex justify-center py-3">{tab}</a>
                    </li>)}
                </ul>
                { activeSubTab === 'Data' ? 
                (data && Object.keys(data).length > 0 ?
                <Table data={data}/> : 
                <LoaderAnimation/> ) :
                 activeSubTab === 'Insights' ? 
                 (insights && insights.length > 0 ?
                <Information info={insights}/> : 
                <LoaderAnimation/>
                ) : 
                <div/>}
                <ul className="grid grid-flow-col bg-gray-100 rounded-full p-1 border text-sm font-semibold w-1/3">
                    {subTabList.map(tab => 
                    <li id={tab} 
                    onClick={() => setActiveSubTab(tab)} 
                    className={`${activeSubTab ===  tab ? 
                                'text-white  bg-sky-700' : 
                                'text-gray-500 hover:bg-gray-300'} 
                                text-center rounded-full m-1`}>
                        <a className="flex justify-center py-3">{tab}</a>
                    </li>)}
                </ul>
                <Disclaimer/>
            </div>
        </div>
    );
}

const Disclaimer = (props) => {
    const [disappear, setDisappear] = useState(false);

    return (
        <div>
            {!disappear ?
                <div id="bottom-banner" tabindex="-1" class="fixed bottom-0 left-0 z-50 flex justify-between w-full p-3 border-t border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div class="flex items-center mx-auto">
                        <p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                            <span class="inline-flex p-1 mr-3 bg-gray-200 rounded-full dark:bg-gray-600 w-6 h-6 items-center justify-center">
                                <svg class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M18.435 7.546A2.32 2.32 0 0 1 17.7 5.77a3.354 3.354 0 0 0-3.47-3.47 2.322 2.322 0 0 1-1.776-.736 3.357 3.357 0 0 0-4.907 0 2.281 2.281 0 0 1-1.776.736 3.414 3.414 0 0 0-2.489.981 3.372 3.372 0 0 0-.982 2.49 2.319 2.319 0 0 1-.736 1.775 3.36 3.36 0 0 0 0 4.908A2.317 2.317 0 0 1 2.3 14.23a3.356 3.356 0 0 0 3.47 3.47 2.318 2.318 0 0 1 1.777.737 3.36 3.36 0 0 0 4.907 0 2.36 2.36 0 0 1 1.776-.737 3.356 3.356 0 0 0 3.469-3.47 2.319 2.319 0 0 1 .736-1.775 3.359 3.359 0 0 0 0-4.908ZM8.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 9.063a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm2.207-6.856-6 6a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                            </span>
                            <span>Not an investment advice. Not registered with any of the government bodies. Exercise caution before investing.</span>
                        </p>
                    </div>
                    <div class="flex items-center">
                        <button onClick={setDisappear(true)} data-dismiss-target="#bottom-banner" type="button" class="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span class="sr-only">Close banner</span>
                        </button>
                    </div>
                </div> :
            <div/>}
        </div>
    )
}

const Table = (props) => {
    return (
        <div className="flex-auto justify-center w-11/12 overflow-y-auto overflow-x-auto h-96">
            <table className="divide-y divide-gray-200 border w-full max-h-max table-auto">
                <thead className="bg-gray-100 sticky top-0">
                    <tr className="table-row">
                        {props.data.columns.map(col => 
                            <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase table-cell">
                                {col}
                            </th>
                        )
                        }
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {props.data.data.map((row) => 
                    <tr className="table-row">
                        {Object.entries(row).map(([key,value]) => 
                        key != 0 ?
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center table-cell">
                            {value}
                        </td> :
                        <td className="px-6 py-4 w-1/5 text-sm font-semibold text-gray-500 bg-gray-100 text-center table-cell">
                            {value}
                        </td>
                        )}
                    </tr>)}
                </tbody>
                </table>
            </div>
    )
}

const Information = (props) => {
    return (
        <div className="flex-auto justify-center w-11/12 overflow-y-auto overflow-x-auto h-96 bg-slate-100 rounded-lg border" id="insight">
            <div className=" text-gray-600 font-mono text-md p-4 whitespace-pre-line">
                {props.info}
            </div>
        </div>
    )
}

export default Insights;