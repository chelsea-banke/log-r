import { useState } from "react"

function MobileLoglist({maxWidth="850px"}){
    const [view, setView] = useState('all')

    return (
    <div className={`hidden max-[${maxWidth}]:block`}>
        <p className="text-sm m-auto text-gray-500 w-10/12 max-mobile:w-full max-mobile:px-5">view:
        <span>
            <select className='text-gray-500 mx-3' value={view} onChange={(e)=>setView(e.target.value)}>
                <option value='all'>All</option>
                <option value='incomplete'>Incomplete</option>
                <option value='completed'>completed</option>
            </select>
        </span>
        </p>
        <div className="bg-white w-10/12 m-auto p-4 pt-6 rounded-md logbooks max-mobile:w-full">
            {[1, 2, 3].map((i) =>{
                return <div className="w-full">
                    <button className="bg-violet-100 w-8/12 text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200">Logbook {i}</button><span className="ml-4 text-green-500">complete</span>
                </div>
            })}
        </div>
    </div>) 

}

export default MobileLoglist