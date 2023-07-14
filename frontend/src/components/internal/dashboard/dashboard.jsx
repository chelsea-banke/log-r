import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../shared/nav/nav";
import MobileLoglist from "../../shared/logbooks/mobile-loglist";
import DesktopLoglist from "../../shared/logbooks/desktop-loglist";
import Stats from "../../shared/stats/stats";
import './dashboard.css'

function Dashboard(){
    return(
        <div className="dashboard internal bg-stone-100 h-screen flex max-[850px]:block">
            <Nav dashboard={true} />
            <main className="relative w-full max-[850px]:mt-20">
                <header className="w-full flex justify-between p-5 mt-2">
                    <div>
                        <div className="ml-12 max-[500px]:ml-0">
                            <h2 className="text-4xl">Hello Baki,</h2>
                            <p className="text-sm text-gray-500">Welcome back!</p>
                        </div>                        
                    </div>
                    <div className="flex w-fit max-[850px]:hidden">
                        <div className="mr-3 mt-1"><img src="avatar.svg"/></div>
                        <div>
                            <h2>Baki Hanna</h2>
                            <p className="text-sm text-gray-500">Bakiii@gmail.com</p>
                        </div>
                    </div>
                </header>
                <div className="w-full justify-between max-[750px]:block main">
                    <section className="mt-10 max-[750px]:w-full">
                        <MobileLoglist maxWhidth="850px"/>
                        <DesktopLoglist  minWidth="850px"/>
                    </section>
                    <section className="mt-14 max-[750px]:w-full">
                        <Stats/>
                        <Link to="/create-new-logbook">
                            <button className="fixed right-4 bottom-4 text-7xl p-4 bg-violet-500 text-white shadow-2xl px-8 rounded-full max-tablet:text-5xl max-tablet:px-7">+</button>
                        </Link>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Dashboard