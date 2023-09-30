import axios from "axios"
import { useState } from "react"
import { useRole } from "../../../context/roleContext"
import { useUsers } from "../../../context/usersContext"
import { useUpdateUser } from "../../../context/userContext"
import "./admin.css"

function Admin(){
    const role = useRole()
    const users = useUsers()
    const updateUser = useUpdateUser()
    const [email, setEmail] = useState("")

    const manualsCount = ()=>{
        let count = 0
        users.forEach(user=>{
            count+=user["logbooks"].length
        })
        return count
    }

    const manualsList = ()=>{
        const manuals = []
        users.forEach(user=>{
            user["logbooks"].forEach(manual=>{manuals.push(manual)})
        })
        return manuals
    }

    const switchUser = async(e)=>{
        e.preventDefault()
        await axios.get(`http://localhost:3000/api/user/get/:${email}`,
        {withCredentials: true}).then(response=>{
            if(response.data.success){
                console.log(response.data.user)
                updateUser(response.data.user)
            }
        })
    }

    if(users.length != 0){
        return (
            <div>
                <div className="w-full bg-gray-600 px-4 py-3 mt-2">
                    <div>Switch User</div>
                    <form onSubmit={(e)=>{switchUser(e)}} className="flex justify-between">
                        <div className="flex">
                            <div>select: </div>
                            <select name="" id="" className="bg-gray-600 border-b text-white ml-2" value={email} onChange={(e)=>setEmail(e.target.value)}>
                                {users.map(user=>{
                                    return(
                                        <option value={user["email"]}>{user["email"]}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="bg-green-600 px-4 rounded">save</button>
                    </form>
                </div>
                <div className="m-4 flex h-fit">
                    <div className="w-fit mt-1">
                        <div className="px-10 py-6 rounded-l text-4xl bg-blue-300 w-fit">{users.length}</div>
                        <div className="text-center">Users</div>
                    </div>
                    <div className="pl-4 bg-white w-full text-gray-600 rounded-r h-fit mt-1 py-1 admin-list">
                        {users.map(user=>{
                            return(<div className="border-b border-blue-400 flex justify-between">
                                <div>- {user["email"]}</div>
                                <div className="mr-4 text-sm mt-1 font-semibold text-green-500">{user["logbooks"].length}</div>
                            </div>)
                        })}
                    </div>
                </div>
                <div className="m-4 flex">
                    <div className="w-fit mt-1">
                        <div className="px-10 py-6 rounded-l text-4xl bg-blue-300 w-fit">
                            {manualsCount()}
                        </div>
                        <div className="text-center">Manuals</div>
                    </div>
                    <div className="pl-4 bg-white w-full text-gray-600 rounded-r h-fit mt-1 py-1 admin-list">
                        {manualsList().map(manual=>{
                            return(<div className="border-b border-blue-400 flex justify-between">
                                <div>- {manual["title"]}</div>
                                <div className="mr-4 text-sm mt-1 font-semibold text-green-500">{manual["status"]}</div>
                            </div>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
    return(<div>empty</div>)
}

export default Admin