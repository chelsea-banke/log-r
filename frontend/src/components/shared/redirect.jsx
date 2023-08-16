import React from 'react'
import {useNavigate, useLocation} from "react-router-dom"

const Redirect = () => {
    const navigate = useNavigate()
        return (
            <button onClick={() => navigate("/login")}>
                Redirect to Login
            </button>
        ) 
}

export default Redirect;