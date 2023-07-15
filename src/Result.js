export default function Result() {
    return (
        <div className="flex flex-col space-y-5 basis-1/2 items-stretch justify-center content-start py-10 px-10">
            <div className="relative flex flex-col bg-white rounded-xl mx-auto p-4 justify-between space-y-1 shadow-xl w-5/6 h-full ml-0">
                <label for="insights" className="block mb-2 text-sm font-medium text-emerald-800">
                Insights
                </label>
                <div id="insights" className="bg-slate-200 rounded-xl mx-auto p-4 w-full h-full border-gray-300 border">
                    <div className="text-sm font-mono font-semibold text-slate-600">
                    I would like to make a prediction...
                    </div>
                </div>
            </div>
        </div>
    )
}