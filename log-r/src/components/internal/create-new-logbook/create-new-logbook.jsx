import Nav from "../../shared/nav/nav"
import InputField from "../../shared/input/input"
import "./create-new-logbook.css"

function CreateNewLogbook(){
    return(
        <div className="internal bg-stone-100 h-screen flex max-[850px]:block">
            <Nav mask={true}/>
            <div className="relative w-full max-[850px]:mt-10">
                <div className="w-full py-7 mx-10 max-[680px]:mx-5" >
                    <h2 className="text-3xl mb-2">Default Data</h2>
                    <p className="text-gray-500">We’ll need some default data from you to use across this logbook</p>
                </div>
                <form className="mx-10 flex w-full justify-start mt-5 max-[680px]:block max-[680px]:mx-5">
                    <div className="shadow-md w-5/12 p-5 rounded-md bg-white relative max-[680px]:w-11/12">
                        <p className="absolute bottom-full text-sm text-gray-500 left-0">User details</p>
                        <InputField placehold="John Doe" label="Intern's Name" />
                        <InputField placehold="UBaxxxxxxx" label="Matricule Number" styles="mt-5" />
                        <div className="flex mt-5 justify-between"> 
                            <InputField placehold="COME" label="Department" styles="mr-1"/>
                            <InputField placehold="200" label="Level" styles="ml-1" type="number"/>
                        </div>
                        <p className=" mt-5">Duration</p>
                        <div className="flex justify-evenly p-3 border border-violet-700"> 
                            <InputField label="From" styles="w-5/12" type="date"/>
                            <InputField label="To" styles="w-5/12" type="date"/>
                        </div>
                    </div>
                    <div className="shadow-md w-5/12 p-5 rounded-md bg-white ml-10 relative max-[680px]:w-11/12 max-[680px]:ml-0 max-[680px]:mt-14">
                        <p className="absolute bottom-full text-sm text-gray-500 left-0">Company details</p>
                        <InputField placehold=" XXXXINC" label="Company Name"/>
                        <InputField placehold="Douala" label="Address" styles="mt-5"/>
                        <InputField placehold="6XX-XXX-XXX" label="Phone Number" styles="mt-5"/>
                        <InputField placehold="xxxinc@gmail.com" label="Email" styles="mt-5"/>
                        <button className="block w-full py-2 rounded-md bg-violet-600 text-white mt-8 font-semibold">Create Logbook</button>
                    </div>
                </form>
                <div className="mx-10 flex w-full justify-start max-[680px]:block max-[680px]:mx-5">
                    <div className="w-5/12 relative"></div>
                    <div className="w-5/12 px-5 rounded-md ml-10 relative max-[680px]:w-11/12 max-[680px]:ml-0">
                        <button className="block w-full py-2 rounded-md bg-stone-100 text-red-500 border border-red-500 font-semibold mt-5">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewLogbook