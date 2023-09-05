import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUpdateLogbook } from "../../../context/logbookContext"
import { useUser, useUpdateUser } from "../../../context/userContext"
import Redirect from "../../shared/redirect"
import Nav from "../../shared/nav/nav"
import InputField from "../../shared/input/input"
import "./create-new-logbook.css"

function CreateNewLogbook(){
    const updateLogbook = useUpdateLogbook()
    const user = useUser()
    const updateUser = useUpdateUser()
    const navigate = useNavigate()

    const [interName, setInterName] = useState("")
    const [matricule, setMatricule] = useState("")
    const [department, setDepartment] = useState("")
    const [level, setLevel] = useState("")
    const [startDate, setStartDate] = useState("")
    const [weeks, setWeeks] = useState("")
    const [companyName, setCompanName] = useState("")
    const [adress, setAdress] = useState("")
    const [companyContact, setCompanyContact] = useState("")
    const [companyEmail, setCompanyEmail] = useState("")
    const [title, setTitle] = useState("")

    const formSubmit = async (e)=>{
        e.preventDefault()
        let sd = new Date(startDate)
        if (sd.getDay() != 1){
            alert("Date Must Be A Monday !!!")
            return
        }
        await axios.post("http://localhost:3000/api/logbook/create-new", {
            "intern_name": interName,
            "matricule": matricule,
            "department": department,
            "level": level,
            "start_date": startDate,
            "weeks": weeks,
            "company_name": companyName,
            "address": adress,
            "phone": companyContact,
            "company_email": companyEmail,
            "title": title,
            "status": "incomplete"
        },
        {withCredentials: true}).then(respond=>{
            if (respond.data.success){
                user["logbooks"].push(respond.data.logbook["title"])
                updateUser(user)
                updateLogbook(respond.data.logbook)
                navigate("/logbook")
            }
            else{
                e.target.reset()
            }
        }).catch((error)=>{
            console.log(error.response ? error.response.data : error)
        })
    }

    if(user){
        return(
            <div className="create-new-logbook internal bg-stone-100 h-screen flex max-[850px]:block">
                <Nav mask={true}/>
                <div className="relative w-full m-auto max-[850px]:mt-5">
                    <div className="w-full py-7 mx-10 max-[680px]:mx-5" >
                        <h2 className="text-3xl mb-2">Default Data</h2>
                        <p className="text-gray-500">We’ll need some default data from you to use across this logbook</p>
                    </div>
                    <form className="flex w-full m-auto justify-start mt-5 max-[680px]:block max-[680px]:mx-5" onSubmit={(e)=>formSubmit(e)}>
                        <div className="shadow-md w-5/12 m-auto p-5 rounded-md bg-white relative max-[680px]:w-11/12 max-[680px]:ml-0">
                            <InputField placehold="Logbook 1" label="Title" styles={"mb-5"} getInput={setTitle} />
                            <p className="absolute bottom-full text-sm text-gray-500 left-0">User details</p>
                            <InputField placehold="John Doe" label="Intern's Name" getInput={setInterName} />
                            <InputField placehold="UBaxxxxxxx" label="Matricule Number" styles="mt-5" getInput={setMatricule} />
                            <div className="flex mt-5 justify-between"> 
                                <InputField placehold="COME" label="Department" styles="mr-1" getInput={setDepartment} />
                                <InputField placehold="200" label="Level" styles="ml-1" type="number" getInput={setLevel}/>
                            </div>
                            <div className="flex mt-10 justify-evenly p-3 border border-violet-700"> 
                                <InputField label="Start" styles="w-5/12" type="date" getInput={setStartDate}/>
                                <InputField label="Duration (weeks)" styles="w-5/12" type="number" placehold={"001"} getInput={setWeeks}/>
                            </div>
                        </div>
                        <div className="shadow-md w-5/12 p-5 rounded-md bg-white m-auto relative max-[680px]:w-11/12 max-[680px]:ml-0 max-[680px]:mt-14">
                            <p className="absolute bottom-full text-sm text-gray-500 left-0">Company details</p>
                            <InputField placehold=" XXXXINC" label="Company Name" getInput={setCompanName}/>
                            <InputField placehold="Douala" label="Address" styles="mt-5" getInput={setAdress}/>
                            <InputField placehold="6XX-XXX-XXX" label="Phone Number" styles="mt-5" getInput={setCompanyContact}/>
                            <InputField placehold="xxxinc@gmail.com" label="Email" styles="mt-5" getInput={setCompanyEmail}/>
                            <button type="submit" className="block w-full py-2 rounded-md bg-violet-600 text-white mt-8 font-semibold">Create Logbook</button>
                            <Link to="/dashboard">
                                <button type="button" className="mb-0 block w-full py-2 rounded-md bg-stone-100 text-red-500 border border-red-500 font-semibold mt-5">Cancel</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return (<Redirect pageName={"Login"} url={"/login"} message={"Unauthotised aceess !!!"}/>)
}

export default CreateNewLogbook