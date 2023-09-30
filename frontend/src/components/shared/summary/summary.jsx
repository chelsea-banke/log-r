import axios from "axios"
import {useUser, useUpdateUser} from "../../../context/userContext"
import { useRole } from "../../../context/roleContext"
import { useUpdateLogbook } from "../../../context/logbookContext"
import { useNavigate } from "react-router-dom"
import request from "../../../utils/request"
import "./summary.css"

function Summary(){
    const user = useUser()
    const role = useRole()
    const updateUser = useUpdateUser()
    const updateLogbook = useUpdateLogbook()
    const navigate = useNavigate()
    const fields = ["objectives", "outcome", "remarks", "review"]

    const updateLog = async (email, title, week, field, data)=>{
        console.log(email, title, week, field, data)
        console.log(email, title, week, field, data);
        await axios.put(`http://localhost:3000/api/log/:${email}/:${title}/:${week}`, {
            [field]: data
        },{withCredentials: true}).then(async results=>{
            if(results.data.success){
                await axios.get(`http://localhost:3000/api/user/get/:${user["email"]}`,
                {withCredentials: true}).then(respond=>{
                    if (respond.data.success){
                        updateUser(respond.data.user)
                    }
                }).catch((error)=>{
                    console.log(error.response ? error.response.data : error)
                })
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
        })
    }

    const getLogbook = async (email, title)=>{
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
    
    return(
        <div className="w-11/12 m-auto mx-4 mt-5 h-full summary">
            {user["logbooks"].map(logbook=>{
                return(
                    <div className="mt-4">
                        <div className="flex justify-between border-b border-white">
                            <button onClick={()=>{
                                getLogbook(logbook["user_id"], logbook["title"])
                            }}>{logbook["title"]}</button>
                            <div className="flex justify-end">
                                <div className="mr-2 text-sm mt-1">{logbook["status"]}</div>
                                <button className="bg-white rounded-t mr-2 quick-img"><img src="preview.png" alt="" /></button>
                                <button className="bg-white rounded-t mr-2 quick-img"><img src="download.png" alt="" /></button>
                                <button className="mr-2 bg-white text-blue-400 px-2 rounded-t" onClick={(e)=>{
                                const logbookSummary = document.getElementById(`${logbook["title"].split(" ").join("").toLowerCase()}-summary`)
                                    console.log(logbookSummary.style.maxHeight)
                                    if (logbookSummary.style.maxHeight == "none") {
                                        logbookSummary.style.maxHeight = "0px";
                                    } else {
                                        logbookSummary.style.maxHeight = "none"
                                    }
                                }}>+</button>
                            </div>
                        </div>
                        <div className="summary-accordion bg-white rounded-b-md" id={`${logbook["title"].split(" ").join("").toLowerCase()}-summary`}>
                            {logbook["logs"].map(log=>{
                                return(
                                    <div className="">
                                        <div className="flex justify-between ml-4 pt-2 border-b border-blue-400 text-blue-400">
                                            <h5>week {log["week"]}</h5>
                                            <div className="flex">
                                            <div className="mr-2 flex text-sm">
                                                <div className="mr-2 mt-1">{log["status"]}</div>
                                                {role!='admin' ?
                                                    log["status"] != "review" && log["status"] != "approved"?
                                                        <button className="bg-green-500 text-white h-full rounded-t px-2" onClick={()=>{updateLog(log["manual_user_id"], log["manual_id"], log["week"], "status", "review")}}>submit</button> : 
                                                        <button className="bg-yellow-500 text-gray-600 h-full rounded-t px-2" onClick={()=>{updateLog(log["manual_user_id"], log["manual_id"], log["week"], "status", "pending")}}>cancel</button>
                                                    :
                                                    log["status"]=="review" ?
                                                        <>
                                                            <button className="bg-yellow-400 text-gray-600 h-full rounded-t px-2" onClick={()=>{updateLog(log["manual_user_id"], log["manual_id"], log["week"], "status", "rejected")}}>reject</button>
                                                            <button className="bg-blue-500 text-white h-full rounded-t px-2 ml-1" onClick={()=>{updateLog(log["manual_user_id"], log["manual_id"], log["week"], "status", "approved")}}>approve</button>
                                                        </>
                                                    : ""
                                                }
                                            </div>
                                                <button className="mr-2 bg-blue-400 text-white px-2 rounded-t" onClick={()=>{
                                                    const logSummary = document.getElementById(`${logbook["title"].split(" ").join("").toLowerCase()}-${log["week"]}-summary`)
                                                    if (logSummary.style.maxHeight == "0px" || logSummary.style.maxHeight == "") {
                                                        logSummary.style.maxHeight = logSummary.scrollHeight + "px"
                                                    } else {
                                                        logSummary.style.maxHeight = "0px";
                                                    }
                                                }}>+</button>
                                            </div>
                                        </div>
                                        <div className="summary-accordion border-l border-blue-400 ml-4 mb-5" id={`${logbook["title"].split(" ").join("").toLowerCase()}-${log["week"]}-summary`}>
                                            {fields.map(field=>{
                                                return(
                                                    <div className="text-blue-400 ml-4 mt-2">
                                                        <h6>{field}</h6>
                                                        <p className="bg-blue-400 text-white p-2 border-r rounded-l">
                                                            {log[field]}
                                                        </p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>   
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Summary