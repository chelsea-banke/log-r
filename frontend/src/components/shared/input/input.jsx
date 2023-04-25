import { useState } from "react";
import './input.css'


function InputField({id, label, placehold, onValueChange, type, styles }){
    return(
        <div className={styles}>
            <label htmlFor={id}>{label}</label><br/>
            <input type={type} placeholder={placehold} id={id} onChange={onValueChange} className=" border-2 rounded-md p-2 w-full border-gray-400" />
        </div>
    )
}

export default InputField