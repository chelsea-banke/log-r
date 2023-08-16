import { useState } from "react";
import './input.css'


function InputField({id, label, placehold, type, styles, required=true, getInput}){
    return(
        <div className={styles}>
            <label htmlFor={id}>{label}</label><br/>
            <input required={required} type={type} placeholder={placehold} id={id} onChange={(e)=>{getInput(e.target.value)}} className=" border-2 rounded-md p-2 w-full border-gray-400" />
        </div>
    )
}

export default InputField