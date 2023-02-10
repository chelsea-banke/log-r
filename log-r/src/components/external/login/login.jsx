import { useState } from 'react'
import { Link } from 'react-router-dom'
import InputField from '../../shared/input/input'
import Google from './assets/google.svg'
import './login.css'

function Login(){
    return(
        <div className='login h-screen flex justify-between'>
            <div className='w-1/2 h-full max-[1000px]:hidden'>
                <h2 className='text-6xl ml-20  my-10'>Login</h2>
                <div className='bg-violet-500 p-10 w-3/4 extra text-white rounded-md py-15'>
                    <h3 className='text-5xl font-semibold mt-5'>Create your Logbook and <br/> have it <br/> everywhere <br/> you go</h3>
                    <p className='mt-10 text-lg'>Create profile pictures, online gaming display pictures, and much more on the go.</p>
                </div>
            </div>
            <div className='form w-1/2 h-full max-[1000px]:m-auto max-[1000px]:w-screen'>
                <div className='m-4 w-3/4 my-10'>
                    <h2 className='text-3xl max-[1000px]:hidden'>Hey, Welcome back</h2>
                    <h2 className='hidden text-3xl max-[1000px]:block'>Login</h2>
                    <p className='mt-1'>Enter the info you used to sign up</p>
                </div>
                <form className=''>
                    <InputField label="Email Adress" styles="w-3/4 m-4" type="email"/>
                    <InputField label="Password" styles="w-3/4 m-4" type="password"/>
                    <div className='flex justify-between w-3/4 m-4'>
                        <div>Remember me</div>
                        <div className='text-violet-500'><Link to="/recovery"/>Forgot password ?</div>
                    </div>
                    <button className="w-3/4 py-3 px-6 mt-10 border-2 text-white bg-violet-500 border-violet-500 font-semibold rounded-md m-4">
                    Login</button>
                </form>
                <button className="w-3/4 py-3 px-6 border-2 text-gray-900 bg-white border-gray-300 rounded-md m-4">
                <img className='inline' src={Google} /> Login with Google</button>
                <p className='m-4 w-3/4 text-center'>Don't have an account? <span className='text-violet-500'><Link to="/signup">Sign up</Link></span></p>
            </div>
        </div>
    )
}

export default Login
