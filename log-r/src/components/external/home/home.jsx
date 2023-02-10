import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../shared/header/header";
import homeIllus from "./assets/undraw_online_test_re_kyfx.svg"
import './home.css'

function Home(){
    return (
        <div className="home">
            <Header/>
            <div className="w-full h-screen flex max-[900px]:flex-col  max-[900px]:mt-20">
                <div className="w-1/2 h-full bg-gray-900 text-white flex flex-col justify-center text-center max-[900px]:w-full">    
                    <h2 className="text-7xl m-2 max-[900px]:text-5xl max-[400px]:text-4xl">
                        <span>Create</span> And <br/> <span>Manage</span> <br/> Your Logbooks</h2>
                    <p className="text-lg mx-5">
                        Create, manage, and store your logbooks online using our system</p>
                    <div className="mt-10">
                        <Link to="/login">
                            <button className="py-3 px-12 border-2 text-white  text-4xl bg-violet-500 border-violet-500 rounded-sm mx-2 w-fit mb-5 max-[500px]:px-4 max-[500px]:py-1">
                            Get Started !
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-1/2 h-full grad max-[900px]:w-full">
                    <img src={homeIllus} />
                </div>
            </div>
        </div>
    )
}

export default Home