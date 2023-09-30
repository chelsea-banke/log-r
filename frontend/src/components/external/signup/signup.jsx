import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUpdateUser } from '../../../context/userContext'
import { useUpdateRole } from '../../../context/roleContext'
import auth from "../../../services/auth"
import InputField from '../../shared/input/input'
import Google from './assets/google.svg'
import './signup.css'

function Signup(){
    const updateUer = useUpdateUser()
    const updateRole = useUpdateRole()
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const formSubmit = async (e)=>{
        e.preventDefault()
        await auth.signUp(firstName, lastName, email, password).then(user=>{
            if(user){
                updateUer(user)
                updateRole(user["role"])
                navigate("/dashboard")
            }
        })
    }

    return(
        <div className='signup h-screen flex justify-between'>
            <div className='w-1/2 h-full max-[1000px]:hidden'>
                <h2 className='text-6xl ml-20  my-10'>Sign up</h2>
                <div className='bg-violet-500 p-10 w-3/4 extra text-white rounded-md py-15'>
                    <h3 className='text-5xl font-semibold mt-5'>Create your Logbook and <br/> have it <br/> everywhere <br/> you go</h3>
                    <p className='mt-10 text-lg'>Create profile pictures, online gaming display pictures, and much more on the go.</p>
                </div>
            </div>
            <div className='form w-1/2 h-full max-[1000px]:m-auto max-[1000px]:w-screen'>
                <h2 className='hidden m-4 text-3xl max-[1000px]:block title'>Sign up</h2>
                <form className='' onSubmit={async (e)=>formSubmit(e)}>
                    <div className='dual flex justify-between m-3'>
                        <InputField label="First Name" styles="w-1/2 m-1" getInput={setFirstName}/>
                        <InputField label="Last Name" styles="w-1/2 m-1" getInput={setLastName}/>
                    </div>
                    <InputField label="Email Adress" styles="w-3/4 m-4" type="email" getInput={setEmail}/>
                    <InputField label="Password" styles="w-3/4 m-4" type="password" getInput={setPassword}/>
                    <div className='flex justify-between w-3/4 m-4'>
                        <div>Remember me</div>
                        <div className='text-violet-500'><Link to="/recovery"/>Forgot password ?</div>
                    </div>
                    <div className='dual flex justify-between w-3/4 m-3'>
                        <button className="w-1/2 py-3 px-6 mt-10 border-2 text-red-500 bg-white-500 border-red-500 font-semibold rounded-md m-1" type="button">Cancel</button>
                        <button className="w-1/2 py-3 px-6 mt-10 border-2 text-white bg-violet-500 border-violet-500 font-semibold rounded-md m-1" type="submit">Create account</button>
                    </div>
                </form>
                <button className="block w-3/4 py-3 px-6 border-2 text-gray-900 bg-white border-gray-300 rounded-md m-4">
                <img className='inline' src={Google} /> Signup with Google</button>
                <p className='m-4 w-3/4 text-center'>Already have an account? <span className='text-violet-500'><Link to="/login">Login</Link></span></p>
            </div>
        </div>
    )
}

export default Signup