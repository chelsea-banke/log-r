import { Link } from 'react-router-dom';
import './building.css'

function Building(){
    return(
        <div className='building w-full'>
            <div className='mt-20 w-fit relative m-auto'>
                <img className='gear-1' src="gear.png" />
                <img className='gear-2' src="gear.png" />
                <img className='gear-4' src="gear.png" />
            </div>
            <p className='w-full text-center'>Sorry!! but this page is still under construction</p>
            <Link to="/dashboard">
                <button className="block m-auto w-1/2 py-2 rounded-md bg-stone-100 text-gray-500 border border-violet-500 font-semibold mt-5">Return to Dashboard</button>
            </Link>
        </div>
    )
}

export default Building;