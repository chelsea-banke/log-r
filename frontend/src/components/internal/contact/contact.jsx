import Building from "../../shared/building/building";
import Nav from "../../shared/nav/nav";
import './contact.css'

function Contact(){
    return(
        <div className="dashboard internal bg-stone-100 h-screen flex max-[850px]:block">
            <Nav contact={true} />
            <div className="relative w-full max-[850px]:mt-20">
                <Building/>
            </div>
        </div>
    )

}
export default Contact