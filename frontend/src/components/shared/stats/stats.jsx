import { useUser } from "../../../context/userContext"
import "./stats.css"


function Stats(){
    const user= useUser()
    return(
        <div className="w-full text-center flex justify-evenly flex-wrap mx-auto max-[1145px]:w-11/12">
            <div className="stat p-5 border-2 border-blue-400 rounded-md h-fit tracking-wide">
                <div className="text-7xl font-semibold text-violet-300">{user["logbooks"].length}</div>
                <h3 className="text-2xl max-[500px]:text-xl">Manuals</h3>
            </div>
            <div className="stat p-5 border-2 border-blue-400 rounded-md h-fit tracking-wide">
                <div className="text-7xl font-semibold text-violet-300">{user["logbooks"].filter(logbook=>{return logbook["status"]=="incomplete"}).length}</div>
                <h3 className="text-2xl max-[500px]:text-xl">Incomplete</h3>
            </div>
            <div className="stat p-5 border-2 border-blue-400 rounded-md h-fit tracking-wide">
                <div className="text-7xl font-semibold text-violet-300">{user["logbooks"].filter(logbook=>{return logbook["status"]=="completed"}).length}</div>
                <h3 className="text-2xl  max-[500px]:text-xl">Completed</h3>
            </div>
            <div className="stat p-5 border-2 border-blue-400 rounded-md h-fit tracking-wide">
                <div className="text-7xl font-semibold text-violet-300">0</div>
                <h3 className="text-2xl max-[500px]:text-xl">Downloads</h3>
            </div>
        </div>
    )
}

export default Stats