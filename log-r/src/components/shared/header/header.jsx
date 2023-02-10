import { useState } from "react";
import { Link } from "react-router-dom";
import './header.css'

function Header() {

    return(
        <header className="w-full flex justify-between p-4 shadow-lg fixed">
            <h1 className="text-4xl font-semibold text-violet-500 ml-10 mt-1 max-[500px]:ml-0">
                LOG-R</h1>
            <div className="mr-5 max-[500px]:mr-0">
                <Link to="login">
                    <button className="py-2 px-6 border-2 border-violet-600 bg-white rounded-lg mx-2 text-violet-600 max-[500px]:mx-0">
                    Log in</button>
                </Link>
                <Link to="signup">
                    <button className="py-2 px-6 border-2 text-white bg-violet-500 border-violet-500 rounded-lg mx-2 max-[500px]:mx-1">
                    Sign up</button>
                </Link>
            </div>
        </header>
    )
}

export default Header