import { useUpdateUser, useUser } from "../context/userContext"
import axios from "axios"

const signUp = async (firstName, lastName, email, password)=>{
    let user = undefined
    await axios.post('http://localhost:3000/api/user/sign-up', {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password
    }).then(response=>{
        if(response.data.success){
            user = response.data.user
        }
    }).catch((error)=>{
        console.log(error.response ? error.response.data : error)
    })
    return user
}

const signIn = async (email, password)=>{
    let user = undefined
    await axios.post('http://localhost:3000/api/user/sign-in', {
        "email": email,
        "password": password
    }).then(response=>{
        if(response.data.success){
            user = response.data.user
        }
    }).catch((error)=>{
        console.log(error.response ? error.response.data : error)
    })
    return user
}

const auth = {signUp, signIn}
export default auth