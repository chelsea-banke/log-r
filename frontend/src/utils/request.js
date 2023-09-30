import axios from "axios"
import { useUpdateUser, useUser } from "../context/userContext"


const refreshUser = async ()=>{
    const updateUser = useUpdateUser()
    const user = useUser()
    
    await axios.get(`http://localhost:3000/api/user/get/:${user["email"]}`,
    {withCredentials: true}).then(respond=>{
        if (respond.data.success){
            updateUser(respond.data.user)
        }
    }).catch((error)=>{
        console.log(error.response ? error.response.data : error)
    })
}

const updateLog = async (email, title, week, field, data)=>{
    console.log("fetching.......")
    await axios.put(`http://localhost:3000/api/log/:${email}/:${title}/:${week}`, {
        [field]: data
    },{withCredentials: true}).then(results=>{
        if(results.data.success){
            return results.data["logs"]
        }
    }).catch((error)=>{
        console.log(error.response ? error.response.data : error)
    })
}

export default {refreshUser, updateLog}