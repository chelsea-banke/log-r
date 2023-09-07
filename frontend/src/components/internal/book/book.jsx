import { useUser } from '../../../context/userContext'
import { useLogbook, useUpdateLogbook } from '../../../context/logbookContext'
import Redirect from '../../shared/redirect'
import { Link } from 'react-router-dom'
import axios from "axios"
import Nav from '../../shared/nav/nav'
import Building from '../../shared/building/building'
import './book.css'
import { useReducer, useState } from 'react'

function Book(){
    const [_, forceUpdate] = useReducer(x => x+1, 0)
    const user = useUser()
    const logbook = useLogbook()
    const updateLogbook = useUpdateLogbook()
    // console.log(logbook["logs"])

    let weeksRange = []
    for(let w=1; w<=logbook["weeks"]; w++){weeksRange.push(w)}

    const [editing, setEditing] = useState(false)
    const [updateData, setUpdateData] = useState("")
    const [logEdit, setLogEdit] = useState(()=>{
        let temp={} 
        for(let i=1; i<=logbook["weeks"]; i++){
            temp[i] = {
                "Mon": false, "Tues": false, "Wed": false, "Thurs": false, "Fri": false
            }
        }
        return temp
    })

    const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

    const toogleLogEdit = (week, day, display)=>{
        let tempLogEdit = logEdit
        display ? setEditing(true) : setEditing(false)
        tempLogEdit[week][day]=display
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

    const updateLog = async (e, log, week, day)=>{
        e.preventDefault()
        await axios.put(`http://localhost:3000/api/log/:${log["logbook_id"]}/${log["date"].split("/").join("-")}`, {
            "activity": updateData
        },{withCredentials: true}).then(results=>{
            if(results.data.success){
                // console.log(results.data.logs)
                logbook["logs"] = results.data["logs"]
                updateLogbook(logbook)
                toogleLogEdit(week, day, false)
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
        })
    }

    if (user){
        if(logbook){
            return(
                <div className="book internal bg-stone-100 h-screen flex max-[850px]:block">
                    <Nav dashboard={true} />
                    <div className="book relative w-full max-[850px]:pt-20" id='window'>
                        <header className="w-full flex justify-end p-5 mt-2 top-0">
                            <div className='w-fit'>
                                <h2 className='text-4xl font-semibold'>{logbook["title"]}</h2>
                                <div className='w-full flex justify-between mt-2'>
                                    <button className="text-sm text-white py-1 px-4 border bg-green-500 rounded-md">Preview</button>
                                    <button className="text-sm py-1 px-4 rounded-md text-white bg-blue-500">Download</button>
                                </div>
                            </div>
                        </header>
                        <div className='px-10 max-[600px]:px-0'>
                            {weeksRange.map((week)=>{
                                return(
                                    <div className='mb-10 ' key={week}>
                                        <div className='sticky hold'>
                                            <div className='text-violet-600 bg-stone-100 pt-12 max-[850px]:pt-3 max-[600px]:px-4'>Week {week}</div>
                                            <div className='w-full flex justify-end border-t-2 border-violet-400'>
                                                {/* <Link to='/create-new-log'>
                                                    <button className='text-3xl text-violet-600 px-3 py-1 border-2 border-violet-500 rounded-md bg-stone-100'>+</button>
                                                </Link> */}
                                            </div>
                                        </div>
                                        <div className='flex justify-between flex-wrap mt-2'>
                                            {logbook["logs"].filter(log=>{return(log["week"]==week)}).map((log)=>{
                                                const date = new Date(log["date"])
                                                const day = days[date.getDay()-1]
                                                return(
                                                    <>
                                                        <div className={`log p-4 pb-2 rounded-md bg-white mb-10 border ${logEdit[week][day] ? 'hidden' : 'block'}`}>
                                                            <div className='w-full text-gray-400 mb-2'>
                                                                <span className='border-b border-violet-600'>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} </span>
                                                                <span className='text-violet-600 font-medium'>({day})</span>
                                                            </div>
                                                            <div className='log-content'>{log["activity"]}</div>
                                                            <div className='w-full flex justify-between relative'>
                                                                <div className=''></div>
                                                                <button onClick={()=>{
                                                                    if(!editing){
                                                                        setUpdateData(log["activity"])
                                                                        toogleLogEdit(week, day, true)
                                                                    }}}
                                                                className={`block ${editing ? 'bg-violet-300' : 'bg-violet-500'} text-white px-4 py-1 rounded-md`}>Edit</button>
                                                            </div>
                                                        </div>
                                                        <form id={`form-${week}-${day}`} className={`log p-4 pb-2 rounded-md bg-white mb-10 border border-green-300 ${logEdit[week][day] ? 'block' : 'hidden'}`} onSubmit={(e)=>updateLog(e, log, week, day)}>
                                                            <div className='w-full text-gray-400 mb-2'>
                                                                <span className='border-b border-green-500'>{`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} </span>
                                                                <span className='text-green-500 font-medium'>({day})</span>
                                                            </div>
                                                            <textarea id={`${week}-${day}`} rows={"3"} className='w-full focus:outline-none' onChange={(e)=>{console.log(e.target.value); setUpdateData(e.target.value)}}>{log["activity"]}</textarea>
                                                            <div className='w-full flex justify-between mt-2'>
                                                                <div></div>
                                                                <div className='flex'>
                                                                    <button type='submit' className='bottom-1 block bg-green-500 text-white px-4 py-1 rounded-md mr-1'>save</button>
                                                                    <button type='button' onClick={()=>{
                                                                        document.getElementById(`form-${week}-${day}`).reset()
                                                                        document.getElementById(`${week}-${day}`).setAttribute("value", log["activity"])
                                                                        document.getElementById(`${week}-${day}`).innerHTML = log["activity"]
                                                                        console.log(document.getElementById(`${week}-${day}`))
                                                                        toogleLogEdit(week, day, false)}} className='bottom-1 block bg-red-500 text-white px-4 py-1 rounded-md'>cancel</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                            <button className='top p-5 bg-violet-500' onClick={()=>scrollToTop('window')}>
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