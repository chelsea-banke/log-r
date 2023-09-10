import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { useUser } from "../../../context/userContext";
import Redirect from "../../shared/redirect";
import Nav from "../../shared/nav/nav";
import MobileLoglist from "../../shared/logbooks/mobile-loglist";
import DesktopLoglist from "../../shared/logbooks/desktop-loglist";
import Stats from "../../shared/stats/stats";
import Details from "../../shared/details/details";
import './dashboard.css'

function Dashboard(){
    const user = useUser()
    const [detailToDisplay, setDetailToDisplay] = useState(null)
    const [overlayDisplay, setOverlayDisplay] = useState("")
    const [detailDisplay, setDetailDisplay] = useState("")
    const navigate = useNavigate()

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
                    <header className="w-full flex justify-between py-5 mt-2 max-[500px]:mx-4">
                        <div>
                            <div className="ml-12 max-[500px]:ml-0">
                                <h2 className="text-4xl">Hello {user["first_name"]},</h2>
                                <p className="text-sm text-gray-500">Welcome back!</p>
                            </div>                        
                        </div>
                        {/* <div className="flex w-fit max-[850px]:hidden">
                            <div className="mr-3 mt-1"><img src="avatar.svg"/></div>
                            <div>
                                <h2>{user["first_name"]} {user["last_name"]}</h2>
                                <p className="text-sm text-gray-500">{user["email"]}</p>
                            </div>
                        </div> */}
                    </header>
                    <div className="w-full justify-between max-[750px]:block main">
                        <section className="mt-10 max-[750px]:w-full">
                            <MobileLoglist maxWhidth="850px" detailDisplayHandler={detailDisplayHandler}/>
                            <DesktopLoglist  minWidth="850px" detailDisplayHandler={detailDisplayHandler}/>
                        </section>
                        <section className="mt-14 max-[750px]:w-full">
                            <Stats/>
                            <Link to="/create-new-logbook">
                                <button className="fixed right-4 bottom-4 text-7xl p-4 bg-blue-500 text-white shadow-2xl px-8 rounded-full max-tablet:text-5xl max-tablet:px-7">+</button>
                            </Link>
                        </section>
                    </div>
                </main>
            </div>
        )
    }
    return (<Redirect pageName={"Login"} url={"/login"} message={"Unauthotised aceess !!!"}/>)
}

export default Dashboard