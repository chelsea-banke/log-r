import Nav from "../../shared/nav/nav"
import "./create-new-logbook.css"

function CreateNewLogbook(){
    return(
        <div className="internal bg-stone-100 h-screen flex max-[850px]:block">
            <Nav mask={true}/>
            <div className="relative w-full max-[850px]:mt-20">
                <div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewLogbook