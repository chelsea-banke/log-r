import { useState } from "react";
import './header.css'

function Header() {

    return(
        <header className="w-full flex justify-between p-4 shadow-lg fixed">
            <h1 className="text-4xl font-semibold text-violet-500 ml-10 mt-1 max-[500px]:ml-0">
                LOG-R</h1>
            <div className="mr-5 max-[500px]:mr-0">
                <button className="py-2 px-6 border-2 border-violet-600 bg-white rounded-lg mx-2 text-violet-600 max-[500px]:mx-0">
                    Log in</button>
                <button className="py-2 px-6 border-2 text-white bg-violet-500 border-violet-500 rounded-lg mx-2 max-[500px]:mx-1">
                    Sign up</button>
            </div>
        </header>
    )
}

export default Header