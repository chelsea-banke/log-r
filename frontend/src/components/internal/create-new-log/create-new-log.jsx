import { Link } from 'react-router-dom'
import Nav from '../../shared/nav/nav'
import './create-new-log.css'
function CreateNewLog(){
    return(
        <div className="book internal bg-stone-100 h-screen flex max-[850px]:block">
            <Nav mask={true} />
            <div className="book relative w-full max-[850px]:mt-20">
                <div className='w-full px-10 flex justify-evenly mt-20'>
                    <div className='w-5/12'>
                        <p>Activities</p>
                        <textarea rows="15" className='w-full p-2'></textarea>
                    </div>
                    <div className='w-5/12 h-full'>
                        <div className='mt-28'>
                            <h2 className='text-5xl semibold mb-2'>Logbook 1</h2>
                            <p className='text-2xl mb-2'>Week 1, Day 1</p>
                            <p className='text-2xl'>01/ 01/ 2030</p>
                        </div>
                        <button className="block w-full py-2 rounded-md bg-violet-600 text-white mt-8 font-semibold">Add Log</button>
                        <Link to="/dashboard">
                            <button className="block w-full py-2 rounded-md bg-stone-100 text-red-500 border border-red-500 font-semibold mt-5">Cancel</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewLog