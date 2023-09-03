import { useUser } from '../../../context/userContext'
import { useLogbook } from '../../../context/logbookContext'
import Redirect from '../../shared/redirect'
import { Link } from 'react-router-dom'
import Nav from '../../shared/nav/nav'
import Building from '../../shared/building/building'
import './book.css'
import { useReducer, useState } from 'react'

function Book(){
    const [_, forceUpdate] = useReducer(x => x+1, 0)
    const user = useUser()
    const logbook = useLogbook()

    const [logEdit, setLogEdit] = useState(()=>{
        let temp={} 
        for(let i=1; i<=4; i++){
            temp[i] = {
                "Mon": false, "Tues": false, "Wed": false, "Thurs": false, "Fri": false
            }
        }
        return temp
    })

    const days = ["Mon", "Tues", "Wed", "Thurs", "Fri"]

    const toogleLogEdit = (week, day, display)=>{
        let tempLogEdit = logEdit
        console.log(logEdit)
        tempLogEdit[week][day]=display
        setLogEdit(tempLogEdit)
        forceUpdate()
    }

    function scrollToTop(id) {
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
    if (user){
        if(logbook){
            return(
                <div className="book internal bg-stone-100 h-screen flex max-[850px]:block">
                    <Nav dashboard={true} />
                    <div className="book relative w-full max-[850px]:pt-20" id='window'>
                        <header className="w-full flex justify-end p-5 mt-2 sticky top-0">
                            <div className='w-fit'>
                                <h2 className='text-4xl font-semibold'>{logbook["title"]}</h2>
                                <div className='w-full flex justify-between mt-2'>
                                    <button className="text-sm text-white py-1 px-4 border bg-green-500 rounded-md">Preview</button>
                                    <button className="text-sm py-1 px-4 rounded-md text-white bg-blue-500">Download</button>
                                </div>
                            </div>
                        </header>
                        <div className='px-10 max-[600px]:px-5'>
                            {[1, 2 ,3 ,4].map((week)=>{
                                return(
                                    <div className='mb-10 ' key={week}>
                                        <div className='sticky hold'>
                                            <div className='text-violet-600 bg-stone-100 pt-12 max-[850px]:pt-3'>Week {week}</div>
                                            <div className='w-full flex justify-end border-t-2 border-violet-400'>
                                                {/* <Link to='/create-new-log'>
                                                    <button className='text-3xl text-violet-600 px-3 py-1 border-2 border-violet-500 rounded-md bg-stone-100'>+</button>
                                                </Link> */}
                                            </div>
                                        </div>
                                        <div className='flex justify-between flex-wrap mt-2'>
                                            {days.map((day)=>{
                                                return(
                                                    <>
                                                        <div className={`log p-4 pb-2 rounded-md bg-white mb-10 border ${logEdit[week][day] ? 'hidden' : 'block'}`}>
                                                            <div className='w-full text-gray-400 mb-2'>
                                                                <span className='border-b border-violet-600'>12/12/2030 </span>
                                                                <span className='text-violet-600 font-medium'>({day})</span>
                                                            </div>
                                                            <div>
                                                                Lorem, ipsum dolor sit amet consectetur 
                                                                adipisicing elit. Corporis, libero voluptatibus! 
                                                                Facilis voluptatem, explicabo quod aliquid 
                                                                beataemolestias. Fuga vel magni porro molestiae 
                                                                cum pariatur autem! Ipsam magni neque quod?
                                                            </div>
                                                            <div className='w-full flex justify-between'>
                                                                <div></div>
                                                                <button onClick={()=>toogleLogEdit(week, day, true)} className='bottom-1 block bg-violet-500 text-white px-4 py-1 rounded-md'>Edit</button>
                                                            </div>
                                                        </div>
                                                        <div className={`log p-4 pb-2 rounded-md bg-white mb-10 border border-green-300 ${logEdit[week][day] ? 'block' : 'hidden'}`}>
                                                            <div className='w-full text-gray-400 mb-2'>
                                                                <span className='border-b border-green-500'>12/12/2030 </span>
                                                                <span className='text-green-500 font-medium'>({day})</span>
                                                            </div>
                                                            <textarea rows={"3"} className='w-full px-3 focus:outline-none'></textarea>
                                                            <div className='w-full flex justify-between mt-2'>
                                                                <div></div>
                                                                <button onClick={()=>toogleLogEdit(week, day, false)} className='bottom-1 block bg-green-500 text-white px-4 py-1 rounded-md'>save</button>
                                                            </div>
                                                        </div>
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