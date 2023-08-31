import React from 'react'
import {useNavigate, useLocation} from "react-router-dom"

const Redirect = ({pageName, url, message}) => {
    const navigate = useNavigate()
        return (
            <div className='w-screen h-screen bg-gray-200 absolute'>
                <div className='w-1/2 p-10 m-auto mt-10 bg-white rounded-md shadow-sm'>
                <p className='m-auto block text-center'>{message}</p>
                    <img src='lost.jpg' className='m-auto'/>
                    <button className='m-auto p-5 rounded-md bg-violet-500 text-white font-semibold block w-10/12' onClick={() => navigate(url)}>
                        Back to {pageName}
                    </button>
                </div>
            </div>
        ) 
}

export default Redirect;