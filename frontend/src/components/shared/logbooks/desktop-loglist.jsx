import { useNavigate } from "react-router-dom"
import { useUpdateLogbook } from "../../../context/logbookContext"
import { useState } from "react"
import axios from "axios"
import { useUser } from "../../../context/userContext"

function DesktopLoglist({minWidth, detailDisplayHandler}){
    const user = useUser()
    // console.log(user)
    const updateLogbook = useUpdateLogbook()
    const navigate = useNavigate()
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

    const listHandler = (list)=>{
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
                    return (
                        <div className="w-full h-fit mb-2">
                            <div className="bg-violet-100 flex justify-between w-full text-left text-violet-900 py-2 px-3 rounded-px-3 rounded-md hover:bg-violet-200md hover:bg-violet-200 transition-all">
                                <button className="w-11/12 text-left hover:text-white transition-all" onClick={(e)=>{getLogbook(item["title"], item["user_id"])}}>{item["title"]}</button>
                                <button className="bg-white rounded-full outline-1 hover:outline text-black" onClick={()=>{
                                    detailDisplayHandler(item["title"])
                                }}>info
                                    <img className="inline w-1/6" src="info.svg"/>
                                </button>
                            </div>
                            {user["role"]=="admin" ?
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
        <div className={`w-full pb-10 bg-white flex rounded-t-lg justify-evenly border border-blue-400 border-l-0 max-[${minWidth}]:hidden`}>
            {/* <section className={`w-5/12 mt-10 max-[750px]:w-full max-[750px]:${view==='all'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                <p className="text-sm text-gray-500 w-11/12 m-auto max-[750px]:hidden">All</p>
                <div className="bg-white w-full m-auto p-4 pt-6 logbooks max-[750px]:w-10/12">
                    {listHandler(user["logbooks"])}
                </div>
            </section> */}
            <section className={`w-5/12 mt-10 max-[750px]:w-full max-[750px]:${view==='incomplete'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                <p className="text-sm text-gray-500 w-11/12 m-auto max-[750px]:hidden">Incomplete</p>
                <div className="bg-white w-full m-auto p-4 pt-6 logbooks max-[750px]:w-10/12">
                    {listHandler(user["logbooks"].filter(logbook=>{return(logbook["status"]=="incomplete")}))}
                </div>
            </section>
            <section className={`w-5/12 mt-10 max-[750px]:w-full max-[750px]:${view==='completed'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                <p className="text-sm text-gray-00 w-11/12 m-auto max-[750px]:hidden">completed</p>
                <div className="bg-white w-full m-auto p-4 pt-6 logbooks max-[750px]:w-10/12">
                    {listHandler(user["logbooks"].filter(logbook=>{return(logbook["status"]=="complete")}))}
                </div>
            </section>
        </div>
    )
}

export default DesktopLoglist