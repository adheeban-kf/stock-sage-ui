
function Info(props) {

    var data = props.data

    var percentage = (props.data.yearChange * 100).toFixed(2)
    var percentageDecline = percentage < 0 ? true : false
    const renameList = {
        currency: 'Currency',
        quoteType: 'Quote type',
        fiftyDayAverage: 'Fifty day average', 
        twoHundredDayAverage: 'Two hundred day average',
        lastPrice: 'Last traded price',
        marketCap: 'Market cap',
        lastVolume: 'Last traded volume', 
        yearHigh: '52W high',
        yearLow: '52W low',
        shares: 'No of shares',
        timezone: 'Timezone',
        tenDayAverageVolume: 'Ten day average volume',
        threeMonthAverageVolume: 'Three month average volume'
    }

    const generateInfoList = (data) => {
        var dataList = Object.entries(data).map(([key, val]) => ({ key: key, val: val }));
      
        var genDiv = dataList.filter(({ key }) => key in renameList);
      
        var genDivElements = genDiv.map(({ key, val }) => (
          <div class="flex items-center justify-between pb-2 mb-2 space-x-12 text-sm border-b border-gray-200 md:space-x-24">
            <p>{renameList[key]}</p>
            <div class="flex items-end text-xs">{typeof val == 'number' ? val.toFixed(2) : val}</div>
          </div>
        ));
      
        return genDivElements;
      };
    
    return (
        <div className="flex flex-col space-y-5 basis-1/2 items-stretch justify-center content-start py-10 px-10 h-full">
        <div className="relative flex flex-col bg-white rounded-xl mx-auto p-4 justify-between space-y-1 shadow-emerald-800 shadow-lg w-5/6 ml-0 h-max">
            <label for="insights" className="block mb-2 text-sm font-medium text-emerald-800">
            Insights
            </label>
            <p class="text-sm font-semibold text-gray-700 border-b border-gray-200 w-max">
        {data.exchange}
    </p>
    <div class="flex items-end my-6 space-x-2">
        <p class="text-2xl font-bold text-black">
            {props.ticker}
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
    </div>
        {generateInfoList(data)}
    </div>
    </div>
    )
}

export default Info; 

