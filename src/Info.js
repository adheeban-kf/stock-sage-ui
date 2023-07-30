function Info(props) {

    var data = props.data

    var percentage = props.data['52WeekChange'] ? (props.data['52WeekChange']).toFixed(2) : NaN
    var percentageDecline = percentage < 0 ? true : false

    var ifData = data.length > 0 ? true : false

    console.log(data);
    console.log(ifData);

    const renameList = {
        currency: 'Currency',
        industry: 'Industry',
        marketCap: 'Market cap',
        trailingPE: 'PE ratio',
        priceToBook: 'PB ratio', 
        trailingEps: 'EPS',
        fiftyTwoWeekHigh: '52W high',
        fiftyTwoWeekLow: '52W low',
        beta: 'Beta',
        returnOnEquity: 'Return on equity',
        debtToEquity: 'Debt to equity ratio',
        revenueGrowth: 'Revenue Growth'
    }

    const generateInfoList = (data) => {
        var dataList = Object.entries(data).map(([key, val]) => ({ key: key, val: val }));
      
        var genDiv = dataList.filter(({ key }) => key in renameList);
      
        var genDivElements = genDiv.map(({ key, val }) => (
          <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>{renameList[key]}</p>
            <div class="flex items-end text-xs">{val && typeof val == 'number' ? val.toFixed(2) : val}</div>
          </div>
        ));
      
        return genDivElements;
      };
    
    
    return (
        
        <div className="flex flex-col basis-1/2 justify-center py-auto px-10">
        <div className="flex flex-col bg-white rounded-xl mx-auto p-4 justify-between space-y-1 shadow-sky-800 shadow-lg w-5/6 ml-0 min-h-max">
            <label for="insights" className="block mb-2 text-sm font-medium text-sky-800">
            Insights
            </label>
            <p class="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max">Sector - {data.sector}</p>
            <div class="flex items-end my-6 space-x-2">
                    <p class="text-2xl font-bold text-black">
                        {data.longName}
                    </p>
                    {!percentageDecline ?
                    <span class="flex items-center text-xl font-bold text-green-500">
                        <svg width="30" fill="currentColor" height="30" class="h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                        {percentage}%
                    </span> : 
                    <span class="flex items-center text-xl font-bold text-red-500">
                    <svg width="30" fill="currentColor" height="30" class="h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
                    {percentage}%
                    </span>}
                    <h1 className="text-xs text-gray-500 self-center">1Y</h1>
            </div>
            <h1 className="text-md font-semibold text-gray-600">{props.market.toLowerCase() === 'in' ? "₹ " : '$ '}{data.currentPrice}</h1>
            <br/>
            {generateInfoList(data)}
        </div> 
        </div>
    )
}

export default Info; 

