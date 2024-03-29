import { useReducer, useState, useEffect } from 'react'
import { useUser } from '../../../context/userContext'
import { useRole } from '../../../context/roleContext'
import { useLogbook, useUpdateLogbook } from '../../../context/logbookContext'
import axios from "axios"
import Details from "../../shared/details/details"
import Redirect from '../../shared/redirect'
import Nav from '../../shared/nav/nav'
import './book.css'

function Book(){
    const [_, forceUpdate] = useReducer(x => x+1, 0)
    const user = useUser()
    const role = useRole()
    const logbook = useLogbook()
    const updateLogbook = useUpdateLogbook()
    // console.log(logbook)

    const [detailToDisplay, setDetailToDisplay] = useState((user["logbooks"].filter(lb=>{return(lb["title"] == logbook["title"])}))[0])
    const [overlayDisplay, setOverlayDisplay] = useState("")
    const [detailDisplay, setDetailDisplay] = useState("")

    const detailDisplayHandler = (title, overlay="overlay-in", detail="detail-in")=>{
        setDetailToDisplay((user["logbooks"].filter(logbook=>{return(logbook["title"]==title)}))[0])
        setOverlayDisplay(overlay)
        setDetailDisplay(detail)
    }

    const [editing, setEditing] = useState(false)
    const [updateData, setUpdateData] = useState("")
    const [logEdit, setLogEdit] = useState(()=>{
        let temp={} 
        for(let i=1; i<=logbook["weeks"]; i++){
            temp[i] = {
                "Objectives": false, "Outcome": false, "Remark": false, "Review": false
            }
        }
        return temp
    })


    useEffect(()=>{
        const refreshUser = async ()=>{
            // console.log(logbook[])
            await axios.get(`http://localhost:3000/api/manual/:${logbook["user_id"]}/:${logbook["title"]}`,
            {withCredentials: true}).then(response=>{
                if(response.data.success){
                    console.log(response.data.manual["logs"])
                    logbook["logs"] = response.data.manual["logs"]
                    updateLogbook(logbook)
                    // toogleLogEdit(week, field, false)
                }
            }).catch((error)=>{
                console.log(error.response ? error.response.data : error)
            })
        }
        refreshUser()
    })

    const fields = ["objectives", "outcome", "remarks", "review"]

    const toogleLogEdit = (week, field, display)=>{
        let tempLogEdit = logEdit
        display ? setEditing(true) : setEditing(false)
        tempLogEdit[week][field]=display
        setLogEdit(tempLogEdit)
        // setUpdateData("")
        forceUpdate()
    }

    const scrollToTop = (id)=>{
        const element = document.getElementById(id)
        const currentScroll = element.scrollTop;
        if (currentScroll === 0) return;    
        const duration = 500; // in milliseconds
        const start = performance.now();
        function animateScroll(timestamp) {
            const elapsed = timestamp - start;
            const progress = elapsed / duration;
            const ease = Math.sin(progress * Math.PI / 2);
            element.scrollTop = currentScroll * (1 - ease);
            if (elapsed < duration) {
                requestAnimationFrame(animateScroll);
            }
        }
        requestAnimationFrame(animateScroll);
    }

    const updateLog = async (e, log, week, field, data)=>{
        e.preventDefault()
        await axios.put(`http://localhost:3000/api/log/:${log["manual_user_id"]}/:${log["manual_id"]}/:${week}`, {
            [field]: data
        },{withCredentials: true}).then(results=>{
            if(results.data.success){
                console.log(results.data.logs)
                logbook["logs"] = results.data["logs"]
                updateLogbook(logbook)
                toogleLogEdit(week, field, false)
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
        })
    }

    const clearForm = (week, log, field)=>{
        document.getElementById(`form-${week}-${field}`).reset()
        document.getElementById(`${week}-${field}`).setAttribute("value", log[field])
        document.getElementById(`${week}-${field}`).innerHTML = log[field]
        console.log(document.getElementById(`${week}-${field}`))
        toogleLogEdit(week, field, false)
    }

    if (user){
        if(logbook){
            return(

                <div className="book internal bg-stone-100 h-screen flex max-[850px]:block">
                    <Nav dashboard={true} />
                    <div className="book relative w-full max-[850px]:pt-20 min-h-screen" id='window'>
                    <Details overlayDisplay={overlayDisplay} detailDisplay={detailDisplay} logbook={detailToDisplay} detailDisplayHandler={detailDisplayHandler}/>

                        <header className="w-full flex justify-start p-5 mt-2 top-0 max-[850px]:justify-end">
                            <div className='w-fit mx-5 max-[850px]:mx-0'>
                                <h2 className='text-4xl font-semibold cursor-pointer hover:text-gray-600' onClick={()=>{detailDisplayHandler(logbook["title"])}}>
                                    {logbook["title"]}
                                    <img className="inline info-img w-1/12 mb-1" src="info.svg"/>
                                </h2>
                                <div className='w-full flex justify-start'>
                                    <button className="text-sm text-white py-1 px-4 border bg-green-500 rounded-md w-1/2">Preview</button>
                                    <button className="text-sm py-1 px-4 rounded-md text-white bg-blue-500  w-1/2">Download</button>
                                </div>
                            </div>
                        </header>

                        <div className='px-10 max-[800px]:px-0'>
                            {logbook["logs"].map((log)=>{
                                const week = log["week"]
                                return(

                                    <div className='mb-10 bg-gray-600' key={week}>
                                        <div className='sticky flex justify-between bg-stone-100 hold border-b-4 border-gray-600 pt-12  max-[850px]:pt-2'>
                                            <div className='flex'>
                                                <div className='flex bg-gray-600 w-fit px-5 max-[600px]:px-0'>
                                                    <div className='text-white max-[600px]:ml-4 mt-2'>Week {week}</div>
                                                    { role!='admin' ? 
                                                    <>
                                                        <button className={`text-white px-3 ml-4 h-fit rounded-md max-[600px]:mr-4 mt-2 ${log["status"]=='review' || log["status"]=='approved' ? "hidden" : ''} ${editing ? 'bg-green-400' : 'bg-green-500'}`} 
                                                            onClick={(e)=>{{!editing ? updateLog(e, log, week, 'status', 'review') : alert("still editing")}}}>submit
                                                        </button>
                                                        <button className={`text-gray-600 px-3 ml-4 h-fit rounded-md max-[600px]:mr-4 mt-2 ${log["status"]=='review' ? 'block' : 'hidden'}  ${editing ? 'bg-yellow-300' : 'bg-yellow-500'}`} 
                                                            onClick={(e)=>{{!editing ? updateLog(e, log, week, 'status', 'pending') : alert("still editing")}}}>cancel
                                                        </button>
                                                    </>
                                                    : (log["status"]=='review' ? 
                                                    <>
                                                        <button className={`text-white px-3 ml-4 h-fit rounded-md mt-2  ${editing ? 'bg-blue-300' : 'bg-blue-500'}`} 
                                                            onClick={(e)=>{{!editing ? updateLog(e, log, week, 'status', 'approved') : alert("still editing")}}}>approve
                                                        </button>
                                                        <button className={`text-gray-600 px-3 ml-4 h-fit rounded-md max-[600px]:mr-4 mt-2 ${editing ? 'bg-yellow-300' : 'bg-yellow-500'}`} 
                                                            onClick={(e)=>{{!editing ? updateLog(e, log, week, 'status', 'rejected') : alert("still editing")}}}>reject
                                                        </button>
                                                    </>
                                                    :
                                                    "")
                                                    }
                                                </div>
                                                <div className='ml-3 mt-1'>{log["status"]}</div>
                                            </div>
                                            <button className='bg-gray-600 text-white px-4 font-semibold rounded-t accordion-btn' onClick={(e)=>{
                                                const panel = document.getElementById(`panel-${week}`)
                                                if (panel.style.maxHeight) {
                                                    panel.style.maxHeight = null;
                                                } else {
                                                    panel.style.maxHeight = panel.scrollHeight + "px";
                                                }
                                            }}>+</button>
                                        </div>

                                        <div className='flex justify-between flex-wrap mt-2 px-2 panel' id={`panel-${week}`}>
                                            {fields.map((field)=>{
                                                return(<>

                                                    <div className={`log p-4 pb-2 rounded-md ${ field == 'review' ? 'bg-green-200' : 'bg-white'} mb-5 border ${logEdit[week][field] ? 'hidden' : 'block'}`}>
                                                        <div className='w-full text-gray-400 mb-2'>
                                                            <span className={`border-b border-violet-700 ${field=='review' ? 'font-semibold' : ''}`}>{field.toUpperCase()} </span>
                                                            {/* <span className='text-violet-700 font-medium'>({field})</span> */}
                                                        </div>
                                                        <div className={`${field=='review' ? 'review' : ''} log-content`}>{log[field]}</div>
                                                        <div className='w-full flex justify-between relative'>
                                                            <div className=''></div>
                                                            <button onClick={()=>{
                                                                if(!editing){
                                                                    setUpdateData(log[field])
                                                                    toogleLogEdit(week, field, true)
                                                                }}}
                                                                className={`
                                                                    px-4 text-white py-1 rounded-md transition-all
                                                                    ${editing ? 'bg-gray-400' : 'bg-gray-600'}
                                                                    ${(role !='admin' && field=='review') 
                                                                    ||(role =='admin' && field!='review')
                                                                    ||(log["status"]=="approved") ? 'invisible' : ''}
                                                                `}>
                                                                    Edit <img src='edit.png' className='edit-icon'/>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <form id={`form-${week}-${field}`} className={`log p-4 pb-2 rounded-md bg-white mb-5 border border-green-300 ${logEdit[week][field] ? 'block' : 'hidden'} ${ field == 'review' ? 'bg-green-200' : 'bg-white'} `} onSubmit={(e)=>updateLog(e, log, week, field, updateData)}>
                                                        <div className='w-full text-gray-400 mb-2'>
                                                            <span className='border-b border-green-500'>{field.toUpperCase()} </span>
                                                            {/* <span className='text-green-500 font-medium'>({field})</span> */}
                                                        </div>
                                                        <textarea id={`${week}-${field}`} rows={"3"} className={`w-full focus:outline-none ${ field == 'review' ? 'bg-green-200' : 'bg-white'} `} onChange={(e)=>{console.log(e.target.value); setUpdateData(e.target.value)}}>{log["activity"]}</textarea>
                                                        <div className='w-full flex justify-between mt-2'>
                                                            <div></div>
                                                            <div className='flex'>
                                                                <button type='submit' className='bottom-1 block bg-green-500 text-white px-4 py-1 rounded-md mr-1'>save</button>
                                                                <button type='button' onClick={()=>{clearForm(week, log, field)}} className='bottom-1 block bg-red-500 text-white px-4 py-1 rounded-md'>cancel</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </>)
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                            <button className='top p-5 bg-blue-500 border-2 border-stone-100' onClick={()=>scrollToTop('window')}>
                                <img src='top.png'/>
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        return (<Redirect pageName={"Dashboard"} url={"/dashboard"} message={"Logbook not found !!"} />)
    }
    return (<Redirect pageName={"Login"} url={"/login"} message={"Unauthotised aceess !!"} />)
}

export default Book