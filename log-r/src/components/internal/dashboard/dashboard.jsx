import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../../shared/nav/nav";
import './dashboard.css'

function Dashboard(){
    return(
        <div className="dashboard internal bg-stone-100 h-screen flex max-[850px]:block">
            <Nav dashboard={true} />
            <div className="relative w-full max-[850px]:mt-20">
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
                <div className="w-full flex justify-between max-[750px]:block">
                    <section className="w-1/2 mt-10 max-[750px]:w-full">
                        <p className="text-sm text-gray-500 w-9/12 m-auto">logbooks</p>
                        <div className="bg-white w-9/12 m-auto p-4 pt-6 rounded-md logbooks max-[750px]:w-10/12">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i)=>{
                                return <div className="w-full">
                                    <button className="bg-violet-100 w-8/12 text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200">Logbook {i}</button><span className="ml-4 text-green-500">complete</span>
                                </div>
                            })}
                        </div>
                    </section>
                    <section className="w-1/2 mt-14 max-[750px]:w-full">
                            <div className="w-10/12 text-center flex justify-evenly  mx-auto max-[1145px]:w-11/12">
                                <div className="w-5/12 p-5 border-2 border-gray-600 rounded-md h-fit tracking-wide max-[1145px]:w-5/12">
                                    <div className="text-7xl font-semibold text-gray-400">10</div>
                                    <h3 className="text-2xl max-[500px]:text-xl">Logbooks</h3>
                                </div>
                                <div className="w-5/12 p-5 border-2 border-gray-600 rounded-md h-fit tracking-wide max-[1145px]:w-5/12">
                                    <div className="text-7xl font-semibold text-gray-400">10</div>
                                    <h3 className="text-2xl max-[500px]:text-xl">Ongoing</h3>
                                </div>
                            </div>
                            <div className="w-10/12 text-center flex justify-evenly mt-8 max-[1145px]:w-11/12  mx-auto">
                                <div className="w-5/12 p-5 border-2 border-gray-600 rounded-md h-fit tracking-wide max-[1145px]:w-5/12">
                                    <div className="text-7xl font-semibold text-gray-400">10</div>
                                    <h3 className="text-2xl  max-[500px]:text-xl">completed</h3>
                                </div>
                                <div className="w-5/12 p-5 border-2 border-gray-600 rounded-md h-fit tracking-wide max-[1145px]:w-5/12">
                                    <div className="text-7xl font-semibold text-gray-400">10</div>
                                    <h3 className="text-2xl max-[500px]:text-xl">Downloads</h3>
                                </div>
                            </div>
                            <Link to="/create-new-logbook">
                                <button className="w-9/12 bg-violet-500 p-3 text-white rounded-md mt-10 font-semibold tracking-wider  mx-auto block max-[1145px]:w-10/12">Create New +</button>
                            </Link>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Dashboard