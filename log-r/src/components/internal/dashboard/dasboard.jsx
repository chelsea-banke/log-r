import { useState } from "react";
import Nav from "../../shared/nav/nav";
import './dashboard.css'

function Dashboard(){
    return(
        <div className="bg-stone-100 h-screen flex">
            <Nav/>
            <div className="relative"></div>
        </div>
    )
}

export default Dashboard