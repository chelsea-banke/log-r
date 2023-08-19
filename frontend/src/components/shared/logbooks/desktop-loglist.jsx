import { useState } from "react"
import { useUser } from "../../../context/userContext"

function DesktopLoglist({minWidth}){
    const user = useUser()
    const [view, setView] = useState('all')

    function listHandler(list){
        if (list.length==0){
            return([0, 0, 0, 0, 0].map((i)=>{
                    return <div className="w-full">
                        <button className="bg-violet-100 w-full text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200"></button>
                    </div>
                })
            )
        }
        else {
            return(list.map(item=>{
                    return <div className="w-full">
                        <button className="bg-violet-100 w-full text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200">{item["title"]}</button>
                    </div>
                })
            )
        }
    }

    return (
        <div className={`w-full pb-10 bg-white flex justify-evenly border border-green-400 border-l-0 max-[${minWidth}]:hidden`}>
            <section className={`w-1/4 mt-10 max-[750px]:w-full shadow-lg max-[750px]:${view==='all'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                <p className="text-sm text-gray-500 w-11/12 m-auto max-[750px]:hidden">All</p>
                <div className="bg-white w-full m-auto p-4 pt-6 rounded-md logbooks max-[750px]:w-10/12">
                    {listHandler(user["logbooks"])}
                </div>
            </section>
            <section className={`w-1/4 mt-10 max-[750px]:w-full shadow-lg max-[750px]:${view==='incomplete'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                <p className="text-sm text-gray-500 w-11/12 m-auto max-[750px]:hidden">Incomplete</p>
                <div className="bg-white w-full m-auto p-4 pt-6 rounded-md logbooks max-[750px]:w-10/12">
                    {listHandler(user["logbooks"].filter(logbook=>{return(logbook["status"]=="incomplete")}))}
                </div>
            </section>
            <section className={`w-1/4 mt-10 max-[750px]:w-full shadow-lg max-[750px]:${view==='completed'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                <p className="text-sm text-gray-00 w-11/12 m-auto max-[750px]:hidden">completed</p>
                <div className="bg-white w-full m-auto p-4 pt-6 rounded-md logbooks max-[750px]:w-10/12">
                    {listHandler(user["logbooks"].filter(logbook=>{return(logbook["status"]=="complete")}))}
                </div>
            </section>
        </div>
    )
}

export default DesktopLoglist