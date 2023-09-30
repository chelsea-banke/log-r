import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { useUser, useUpdateUser } from "../../../context/userContext";
import { useRole } from "../../../context/roleContext";
import Redirect from "../../shared/redirect";
import Nav from "../../shared/nav/nav";
import MobileLoglist from "../../shared/logbooks/mobile-loglist";
import DesktopLoglist from "../../shared/logbooks/desktop-loglist";
import Stats from "../../shared/stats/stats";
import Details from "../../shared/details/details";
import Summary from "../../shared/summary/summary";
import Admin from "../../shared/admin/admin";
import './dashboard.css'

function Dashboard(){
    const user = useUser()
    const [actions, setActions] = useState("manuals")
    const updateUser = useUpdateUser()
    const role = useRole()
    const [detailToDisplay, setDetailToDisplay] = useState(null)
    const [overlayDisplay, setOverlayDisplay] = useState("")
    const [detailDisplay, setDetailDisplay] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        const refreshUser = async ()=>{
            await axios.get(`http://localhost:3000/api/user/get/:${user["email"]}`,
            {withCredentials: true}).then(respond=>{
                if (respond.data.success){
                    updateUser(respond.data.user)
                }
            }).catch((error)=>{
                console.log(error.response ? error.response.data : error)
            })
        }
        // refreshUser()
    })

    const detailDisplayHandler = (title, overlay="overlay-in", detail="detail-in")=>{
        setDetailToDisplay((user["logbooks"].filter(logbook=>{return(logbook["title"]==title)}))[0])
        setOverlayDisplay(overlay)
        setDetailDisplay(detail)
    }
    
    
    if(user){
        return(
            <div className="dashboard internal bg-stone-100 h-screen flex max-[850px]:block">
                <Nav dashboard={true} />
                <main className="relative w-full max-[850px]:mt-20">
                    <Details overlayDisplay={overlayDisplay} detailDisplay={detailDisplay} logbook={detailToDisplay} detailDisplayHandler={detailDisplayHandler}/>
                    <header className="w-full flex justify-between py-5 pt-7 border-2 border-t-0 border-r-0 bg-gray-600 text-white rounded-bl-lg">
                        <div>
                            <div className="ml-12 max-[850px]:ml-5">
                                <h2 className="text-4xl">Hello {user["first_name"]},</h2>
                                <p className="text-sm">Welcome back!</p>
                            </div>                        
                        </div>
                        <div className="flex bg-gray-500 px-4 pt-2 rounded-lg w-fit max-[850px]:hidden mr-20">
                            <div className="mt-1"><img src="avatar.svg"/></div>
                            <div>
                                <h2 className="border-b">{user["first_name"]} {user["last_name"]}</h2>
                                <p className="text-sm">{user["email"]}</p>
                            </div>
                        </div>
                    </header>
                    <div className="flex relative max-[850px]:border-b-2 border-blue-400">
                        <div className="w-full main h-3/4">
                            <section className="">
                                <MobileLoglist maxWhidth="850px" detailDisplayHandler={detailDisplayHandler}/>
                                <DesktopLoglist minWidth="850px" detailDisplayHandler={detailDisplayHandler}/>
                            </section>
                            <section className="mt-14 max-[750px]:w-full max-[750px]:mt-5">
                                <Stats/>
                                {role!="admin" ? 
                                    <Link to="/create-new-logbook">
                                        <button className="fixed right-4 bottom-4 text-7xl p-4 bg-blue-500 text-white shadow-2xl px-8 rounded-full max-tablet:text-5xl max-tablet:px-7 border-2 border-stone-100">+</button>
                                    </Link> : ''
                                }
                            </section>
                        </div>
                        <div className="rounded-l-lg bg-blue-400 pb-4 text-white summary-display transition-all summary-out" id="summary">
                            <div className="sticky top-0 max-[850px]:top-20 bg-blue-400 rounded-lg">
                                <button className="absolute summary-in-btn bg-blue-400 p-2 font-semibold rounded-l hidden max-[650px]:block" onClick={()=>{
                                    document.getElementById("summary").classList.toggle("summary-out")
                                }}>{"<"}</button>
                                <div className="w-full pl-4 pt-1 flex justify-between">
                                    <div className="flex justify-between w-full">
                                        <h3 className="text-lg font-semibold mt-1">Quick Actions</h3>
                                        <div className="mr-4 mt-2">{role}</div>
                                    </div>
                                    <button className="text-blue-400 bg-stone-100 border-2 border-stone-100 text-lg font-semibold right-5 py-1 px-1 rounded-l-lg hidden max-[650px]:block" onClick={()=>{
                                        document.getElementById("summary").classList.toggle("summary-out")
                                    }}>{'>'}</button>
                                </div>
                                <div>
                                    <div className="flex py-2 text-lg bg-gray-700 mt-2">
                                        <button className={`mx-4 ${actions != 'admin' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`} onClick={()=>{setActions('manuals')}}>manuals</button>
                                        {role == 'admin' ? 
                                            <button className={`${actions == 'admin' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`} onClick={()=>{setActions('admin')}}>admin</button>
                                            : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            {actions == 'admin' ? <Admin/> : <Summary/>}
                        </div>
                    </div>
                </main>
            </div>
        )
    }
    return (<Redirect pageName={"Login"} url={"/login"} message={"User not found !!!"}/>)
}

export default Dashboard