import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useUser } from "../../../context/userContext"
import { useUpdateLogbook } from "../../../context/logbookContext"

function MobileLoglist({maxWidth="850px", detailDisplayHandler}){
    const navigate = useNavigate()
    const user = useUser()
    const updateLogbook = useUpdateLogbook()
    const [view, setView] = useState('all')

    const getLogbook = async (title, email)=>{
        await axios.get(`http://localhost:3000/api/manual/:${email}/:${title}`,
        {withCredentials: true}).then(respond=>{
            if (respond.data.success){
                updateLogbook(respond.data.manual)
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
                    return(
                        <div className="w-full mb-2">
                                <div className="bg-violet-100 flex justify-between w-full text-left text-violet-900 py-2 px-3 rounded-px-3 rounded-md hover:bg-violet-200md hover:bg-violet-200 transition-all">
                                    <button className="w-11/12 h-full text-left hover:text-white transition-all" onClick={(e)=>{getLogbook(item["title"], item["user_id"])}}>{item["title"]}</button>
                                    <button className="bg-white rounded-full outline-1 hover:outline text-black" onClick={()=>{
                                        detailDisplayHandler(item["title"])
                                    }}>info
                                        <img className="inline w-1/4" src="info.svg"/>
                                    </button>
                                </div>
                                {user["role"]=='admin' ?
                                    <div className="bg-gray-700 w-1/2 text-white text-sm rounded-b-lg px-3">{item["user_id"]}</div>
                                    : ""
                                }
                        </div>
                    )
                })
            )
        }
    }

    return (
    <div className={`hidden max-[${maxWidth}]:block mt-10`}>
        <p className="text-sm m-auto text-gray-500 px-4 w-full">view:
        <span>
            <select className='text-gray-500 mx-3' value={view} onChange={(e)=>setView(e.target.value)}>
                <option value='all'>All</option>
                <option value='incomplete'>Incomplete</option>
                <option value='completed'>completed</option>
            </select>
        </span>
        </p>
        <div className="bg-white w-full m-auto p-4 pt-6 rounded-md logbooks">
            {listHandler(user["logbooks"].filter(logbook=>{return(view=="all" ? true : logbook["status"]==view)}))}
        </div>
    </div>) 

}

export default MobileLoglist