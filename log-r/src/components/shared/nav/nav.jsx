import { useState } from "react";
import { Link } from "react-router-dom";
import './nav.css'

function Nav(){
    const [display, setNavDisplay] = useState('hidden')
    return(
        <div className="">
            <nav className={`relative nav bg-white h-full max-[850px]:${display} max-[850px]:fixed`}>
                <h1 className="text-4xl font-semibold text-violet-500 p-8 ">LOG-R</h1>
                <div className="relative w-full blg-gray-100 tracking-wide">
                    <Link to="">
                        <div className="w-9/12 p-2 rounded-md bg-purple-200 m-auto mb-3"><img src="dashboard.svg" className="inline mb-2 mr-3"/>Dashboard</div>
                    </Link>
                    <Link to="">
                        <div className="w-9/12 p-2 rounded-md m-auto mb-3"><img src="folder.svg" className="inline mb-1 mr-3"/>Logbooks</div>
                    </Link>
                    <Link to="">
                        <div className="w-9/12 p-2 rounded-md m-auto mb-3"><img src="guide.svg" className="inline mb-1 mr-4"/>Guide</div>
                    </Link>
                    <Link to="">
                        <div className="w-9/12 p-2 rounded-md m-auto mb-3"><img src="settings.svg" className="inline mb-1 mr-3"/>Settings</div>
                    </Link>
                    <Link to="">
                        <div className="w-9/12 p-2 rounded-md m-auto mb-3"><img src="contact.svg" className="inline mb-1 mr-2"/>Contact</div>
                    </Link>
                </div>
                <div className="w-11/12 absolute bottom-8">
                    <div className="flex m-auto w-fit">
                        <div className="mr-3 mt-1"><img src="avatar.svg"/></div>
                        <div>
                            <h2>Baki Hanna</h2>
                            <p className="text-sm text-gray-500">Bakiii@gmail.com</p>
                        </div>
                    </div>
                    <button className="relative w-9/12 p-2 border border-gray-600 rounded-md m-auto mt-5 block text-left">Logout<img src="logout.svg" className="absolute right-3 top-2"/></button>
                </div>
                <button className="absolute invisible w-fit p-5 border border-stone-100 text-2xl rounded-md top-0 right-0 text-violet-600 max-[850px]:visible" onClick={()=>{setNavDisplay('hidden')}}>X</button>
            </nav>

            <div className="hidden p-4 justify-between w-screen max-[850px]:flex">
                <button className="block"><img src="menu.svg" className="menu" onClick={()=>{setNavDisplay('block')}} /></button>
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