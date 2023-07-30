import { useState, useEffect } from "react";

const tabList = ["Financials", "Balance Sheet", "Cash Flow", "Income Statement", "Overall"]
const subTabList = ["Insights","Data",]


const Insights = (props) => {
    const [activeTab, setActiveTab] = useState('financials');
    const [activeSubTab, setActiveSubTab] = useState('data');
    const [data, setData] = useState({});

    async function getData(market, infotype, ticker) {
        console.log(market);
        await fetch(`http://localhost:8000/financials/${market}/${infotype}/${ticker}`)
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
        .catch(() => {setData([])})
      }
    
    useEffect(() => {getData(props.market, activeTab, props.ticker);} , [props.market, activeTab, props.ticker])  
    console.log(data);

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
                {Object.keys(data).length > 0  && activeSubTab == 'Data' ? 
                <Table data={data}/> : <div/>}
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
            </div>
        </div>
    );
}

const Table = (props) => {
    console.log(props.data.columns);
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
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center table-cell">
                            {value}
                        </td>
                        )}
                    </tr>)}
                </tbody>
                </table>
            </div>
    )
}

export default Insights;