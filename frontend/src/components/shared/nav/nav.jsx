import { useEffect, useState } from "react";
import { useUser } from "../../../context/userContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import './nav.css'

function Nav({dashboard=false, logbooks=false, guide=false, settings=false, contact=false, mask=false}){
    const user = useUser()
    const navigate = useNavigate()
    const [display, setNavDisplay] = useState(()=>{if (!mask){return ('slide-out')} else {return ('default-nav')}})
    const [maskDisplay, setMaskDisplay] = useState(()=>{if (!mask){return ('mask-out')} else {return ('default-mask')}})

    return(
        <div className="">
            <button onClick={()=>{navigate(-1)}} className="z-50 absolute rounded-full p-3 block right-2 top-6 max-[850px]:hidden">
                <img className="" src="back.png"/>
            </button>
            <nav className={`relative nav bg-blue-400 border-r border-blue-400 h-full ${display} max-[850px]:fixed`}>
                <h1 className="text-4xl font-semibold text-white p-8 px-4 border-blue-600">LOG-R</h1>
                <div className="relative w-full transition-all tracking-wide text-white">
                    <Link to="/dashboard">
                        <div className={`w-11/12 p-2 rounded-md bg-${dashboard ? "blue-200" : "white border border-white"} m-auto mb-3 hover:bg-blue-300 bg-blue-400 transition-all`}><img src="dashboard.svg" className="inline mb-2 mr-3"/>Dashboard</div>
                    </Link>
                    {/* <Link to="/logbook">
                        <div className={`w-11/12 p-2 rounded-md m-auto mb-3 bg-${logbooks ? "blue-200" : "white border border-white"} hover:bg-blue-300 bg-blue-400 transition-all`}><img src="folder.svg" className="inline mb-1 mr-3"/>Logbooks</div>
                    </Link> */}
                    <Link to="/guide">
                        <div className={`w-11/12 p-2 rounded-md m-auto mb-3 bg-${guide ? "blue-200" : "white border border-white"} hover:bg-blue-300 bg-blue-400 transition-all`}><img src="guide.svg" className="inline mb-1 mr-4"/>Guide</div>
                    </Link>
                    <Link to="/settings">
                        <div className={`w-11/12 p-2 rounded-md m-auto mb-3 bg-${settings ? "blue-200" : "white border border-white"} hover:bg-blue-300 bg-blue-400 transition-all`}><img src="settings.svg" className="inline mb-1 mr-3"/>Settings</div>
                    </Link>
                    <Link to="/contact">
                        <div className={`w-11/12 p-2 rounded-md m-auto mb-3 bg-${contact ? "blue-200" : "white border border-white"} hover:bg-blue-300 bg-blue-400 transition-all`}><img src="contact.svg" className="inline mb-1 mr-2"/>Contact</div>
                    </Link>
                </div>
                <div className="w-full absolute bottom-8 lo">
                    <Link className="flex mx-3 w-fit max-[850px]:hidden" to='user-profile'>
                        <div className="mt-1"><img src="avatar.svg"/></div>
                        <div>
                            <h2 className="text-white border-b-2">{user["first_name"]} {user["last_name"]}</h2>
                            <p className="text-sm text-white">{user["email"]}</p>
                        </div>
                    </Link>
                    <button className="text-white relative w-11/12 p-2 border border-white rounded-md m-auto mt-0 block text-left bg-blue-500">Logout<img src="logout.svg" className="absolute right-3 top-2"/></button>
                </div>
                <button className="absolute invisible w-fit p-5 border border-stone-100 transition-all text-2xl rounded-md top-0 right-0 text-blue-600 max-[850px]:visible" onClick={()=>{setNavDisplay('slide-out'); setMaskDisplay('mask-out')}}>X</button>
                <div className={`mask ${mask ? 'block': 'hidden'}`}></div>
            </nav>
            <div className={`${maskDisplay} mobile-mask hidden max-[850px]:block`} onClick={()=>{setNavDisplay('slide-out'); setMaskDisplay('mask-out')}}></div>
            <div className={`mobile-nav border-b border-gray-500 flex max-[850px]:${mask ? 'hidden': 'flex'} fixed p-4 justify-between w-screen`}>
                <button className="block"><img src="menu.svg" className="menu" onClick={()=>{setNavDisplay('slide-in'); setMaskDisplay('mask-in')}} /></button>
                <div className="flex w-fit">
                    <div className="mr-3 mt-1"><img src="avatar.svg"/></div>
                    <div>
                        <h2>{user["first_name"]} {user["last_name"]}</h2>
                        <p className="text-sm text-gray-500">{user["email"]}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Nav