import "./stats.css"

function Stats(){
    return(
        <div className="w-full text-center flex justify-evenly flex-wrap mx-auto max-[1145px]:w-11/12">
            <div className="stat p-5 border-2 border-gray-600 rounded-md h-fit tracking-wide shadow-md">
                <div className="text-7xl font-semibold text-gray-400">10</div>
                <h3 className="text-2xl max-[500px]:text-xl">Logbooks</h3>
            </div>
            <div className="stat p-5 border-2 border-gray-600 rounded-md h-fit tracking-wide shadow-md">
                <div className="text-7xl font-semibold text-gray-400">10</div>
                <h3 className="text-2xl max-[500px]:text-xl">Ongoing</h3>
            </div>
            <div className="stat p-5 border-2 border-gray-600 rounded-md h-fit tracking-wide shadow-md">
                <div className="text-7xl font-semibold text-gray-400">10</div>
                <h3 className="text-2xl  max-[500px]:text-xl">completed</h3>
            </div>
            <div className="stat p-5 border-2 border-gray-600 rounded-md h-fit tracking-wide shadow-md">
                <div className="text-7xl font-semibold text-gray-400">10</div>
                <h3 className="text-2xl max-[500px]:text-xl">Downloads</h3>
            </div>
        </div>
    )
}

export default Stats