import Building from "../../shared/building/building";
import Redirect from "../../shared/redirect";
import { useUser } from '../../../context/userContext'
import Nav from "../../shared/nav/nav";
import './settings.css'

function Settings(){
    const user = useUser()
    if(user){
        return(
            <div className="dashboard internal bg-stone-100 h-screen flex max-[850px]:block">
                <Nav settings={true} />
                <div className="relative w-full max-[850px]:mt-20">
                    <Building/>
                </div>
            </div>
        )
    }
    else{
        return(
            <Redirect pageName={"Login"} url={"/login"} message={"Unauthorized access, User not found"}/>
        )
    }

}
export default Settings