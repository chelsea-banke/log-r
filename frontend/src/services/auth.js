import { useUpdateUser, useUser } from "../context/userContext"
import axios from "axios"

const signUp = async (firstName, lastName, email, password)=>{
    let user = undefined
    await axios.post('http://localhost:3000/api/user/sign-up', {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password
    },
    {withCredentials: true}).then(response=>{
        if(response.data.success){
            user = response.data.user
        }
    }).catch((error)=>{
        console.log(error.response ? error.response.data : error)
    })
    return user
}

const signIn = async (email, password)=>{
    let data = undefined
    await axios.post('http://localhost:3000/api/user/sign-in', {
        "email": email,
        "password": password
    },
    {withCredentials: true}).then(async response=>{
        if(response.data.success){
            if (response.data.user["role"] == "admin"){
                await axios.get('http://localhost:3000/api/user/get-all',
                {withCredentials: true}).then(response2=>{
                    data = {
                        "user": response.data.user,
                        "users": response2.data.users
                    }
                })
            }
            else{
                data = {
                    "user": response.data.user,
                    "users": []
                }
            }
        }
    }).catch((error)=>{
        console.log(error.response ? error.response.data : error)
    })
    return data
}

const auth = {signUp, signIn}
export default auth