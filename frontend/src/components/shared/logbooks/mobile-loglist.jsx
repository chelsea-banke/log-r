import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useUser } from "../../../context/userContext"
import { useUpdateLogbook } from "../../../context/logbookContext"

function MobileLoglist({maxWidth="850px"}){
    const navigate = useNavigate()
    const user = useUser()
    const updateLogbook = useUpdateLogbook()
    const [view, setView] = useState('all')

    const getLogbook = async (title)=>{
        await axios.get(`http://localhost:3000/api/logbook/:${title}`, 
        {withCredentials: true}).then(respond=>{
            if (respond.data.success){
                updateLogbook(respond.data.logbook)
                navigate("/logbook")
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
        })
    }

    function listHandler(list){
        if (list.length==0){
            return([0, 0, 0, 0, 0].map((i)=>{
                    return <div className="w-full">
                        <button className="bg-violet-100 w-full text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200 animate-pulse"></button>
                    </div>
                })
            )
        }
        else {
            return(list.map(item=>{
                    return <div className="w-full">
                        <button onClick={()=>getLogbook(item["title"])} className="bg-violet-100 w-full text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200">{item["title"]}</button>
                    </div>
                })
            )
        }
    }

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
            {listHandler(user["logbooks"].filter(logbook=>{return(view=="all" ? true : logbook["status"]==view)}))}
        </div>
    </div>) 

}

export default MobileLoglist