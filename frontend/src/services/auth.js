import axios from "axios"

const signUp = async (firstName, lastName, email, password)=>{
    await axios.post('http://localhost:3000/api/user/sign-up', {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "password": password
    }).then(response=>{
        if(response.data.success){
            localStorage.setItem("logrUser", response.user)
        }
    }).catch((error)=>{
        console.log(error.response ? error.response.data : error)
    })
}


const isAuthenticated = ()=>{
    const user = localStorage.getItem("logrUser")
    if (user){
        return true
    }
    else{ return false }
}

const auth = {signUp, isAuthenticated}

export default auth