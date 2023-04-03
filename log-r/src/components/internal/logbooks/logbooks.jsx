import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../shared/nav/nav'
import './logbooks.css'
function Logbooks(){
    const [view, setView] = useState('all')
    return(
        <div className="logbooks internal bg-stone-100 h-screen flex max-[850px]:block">
            <Nav logbooks={true}/>
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
                <p className="text-sm w-11/12 m-auto hidden max-[750px]:block select">view:
                    <span>
                        <select className='text-gray-500 mx-3' value={view} onChange={(e)=>setView(e.target.value)}>
                            <option value='all'>All</option>
                            <option value='incomplete'>Incomplete</option>
                            <option value='completed'>completed</option>
                        </select>
                    </span>
                </p>
                <div className="w-full pb-10 bg-white flex justify-evenly max-[750px]:block border-l border-20 border-stone-200">
                    <section className={`w-1/4 mt-10 max-[750px]:w-full shadow-lg max-[750px]:${view==='all'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                        <p className="text-sm text-gray-500 w-11/12 m-auto max-[750px]:hidden">All</p>
                        <div className="bg-white w-full m-auto p-4 pt-6 rounded-md logbooks max-[750px]:w-10/12">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i)=>{
                                return <div className="w-full">
                                    <button className="bg-violet-100 w-full text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200">Logbooka {i}</button>
                                </div>
                            })}
                        </div>
                    </section>
                    <section className={`w-1/4 mt-10 max-[750px]:w-full shadow-lg max-[750px]:${view==='incomplete'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                        <p className="text-sm text-gray-500 w-11/12 m-auto max-[750px]:hidden">Incomplete</p>
                        <div className="bg-white w-full m-auto p-4 pt-6 rounded-md logbooks max-[750px]:w-10/12">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i)=>{
                                return <div className="w-full">
                                    <button className="bg-violet-100 w-full text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200">Logbook {i}</button>
                                </div>
                            })}
                        </div>
                    </section>
                    <section className={`w-1/4 mt-10 max-[750px]:w-full shadow-lg max-[750px]:${view==='completed'? 'block': 'hidden'} max-[750px]:shadow-none`}>
                        <p className="text-sm text-gray-500 w-11/12 m-auto max-[750px]:hidden">completed</p>
                        <div className="bg-white w-full m-auto p-4 pt-6 rounded-md logbooks max-[750px]:w-10/12">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i)=>{
                                return <div className="w-full">
                                    <button className="bg-violet-100 w-full text-left text-violet-900 py-2 px-3 my-1 rounded-md hover:bg-violet-200">Logbook {i}</button>
                                </div>
                            })}
                        </div>
                    </section>
                </div>
                <Link to="/create-new-logbook">
                    <button className="create-new absolute px-20 bg-violet-500 p-3 text-white rounded-md mt-10 font-semibold tracking-wider mx-auto block max-[750px]:relative max-[750px]:right-0">Create New +</button>
                </Link>
            </div>
        </div>
    )
}
export default Logbooks