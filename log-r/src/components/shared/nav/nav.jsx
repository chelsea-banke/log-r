import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './nav.css'

function Nav({dashboard, logbooks, guide, settings, contact, mask=false}){
    const [display, setNavDisplay] = useState('routed')
    const [maskDisplay, setMaskDisplay] = useState('mask-routed')
    return(
        <div className="">
            <nav className={`relative nav bg-white h-full ${display} max-[850px]:fixed max-[850px]:border-2`}>
                <h1 className="text-4xl font-semibold text-violet-500 p-8 border-violet-600">LOG-R</h1>
                <div className="relative w-full blg-gray-100 tracking-wide">
                    <Link to="/dashboard">
                        <div className={`w-9/12 p-2 rounded-md bg-${dashboard ? "purple-200" : "white"} m-auto mb-3 hover:bg-purple-100`}><img src="dashboard.svg" className="inline mb-2 mr-3"/>Dashboard</div>
                    </Link>
                    <Link to="/logbooks">
                        <div className={`w-9/12 p-2 rounded-md m-auto mb-3 bg-${logbooks ? "purple-200" : "white"} hover:bg-purple-100`}><img src="folder.svg" className="inline mb-1 mr-3"/>Logbooks</div>
                    </Link>
                    <Link to="/guide">
                        <div className={`w-9/12 p-2 rounded-md m-auto mb-3 bg-${guide ? "purple-200" : "white"} hover:bg-purple-100`}><img src="guide.svg" className="inline mb-1 mr-4"/>Guide</div>
                    </Link>
                    <Link to="/settings">
                        <div className={`w-9/12 p-2 rounded-md m-auto mb-3 bg-${settings ? "purple-200" : "white"} hover:bg-purple-100`}><img src="settings.svg" className="inline mb-1 mr-3"/>Settings</div>
                    </Link>
                    <Link to="/contact">
                        <div className={`w-9/12 p-2 rounded-md m-auto mb-3 bg-${contact ? "purple-200" : "white"} hover:bg-purple-100`}><img src="contact.svg" className="inline mb-1 mr-2"/>Contact</div>
                    </Link>
                </div>
                <div className="w-11/12 absolute bottom-8">
                    <Link className="flex m-auto w-fit" to='user-profile'>
                        <div className="mr-3 mt-1"><img src="avatar.svg"/></div>
                        <div>
                            <h2>Baki Hanna</h2>
                            <p className="text-sm text-gray-500">Bakiii@gmail.com</p>
                        </div>
                    </Link>
                    <button className="relative w-9/12 p-2 border border-gray-600 rounded-md m-auto mt-5 block text-left">Logout<img src="logout.svg" className="absolute right-3 top-2"/></button>
                </div>
                <button className="absolute invisible w-fit p-5 border border-stone-100 text-2xl rounded-md top-0 right-0 text-violet-600 max-[850px]:visible" onClick={()=>{setNavDisplay('slide-out'); setMaskDisplay('mask-out')}}>X</button>
                <div className={`mask ${mask ? 'block': 'hidden'}`}></div>
            </nav>
            <div className={`${maskDisplay} mobile-mask hidden max-[850px]:block`} onClick={()=>{setNavDisplay('slide-out'); setMaskDisplay('mask-out')}}></div>
            <div className={`mobile-nav border-b border-gray-500 flex max-[850px]:${mask ? 'hidden': 'flex'} fixed p-4 justify-between w-screen`}>
                <button className="block"><img src="menu.svg" className="menu" onClick={()=>{setNavDisplay('slide-in'); setMaskDisplay('mask-in')}} /></button>
                <div className="flex w-fit">
                    <div className="mr-3 mt-1"><img src="avatar.svg"/></div>
                    <div>
                        <h2>Baki Hanna</h2>
                        <p className="text-sm text-gray-500">Bakiii@gmail.com</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Nav