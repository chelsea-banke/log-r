import React, { useState, useContext } from "react";

const UserContext = React.createContext()
const UpdateUserContext = React.createContext()

export const useUser = () => {
    return useContext(UserContext)
}

export const useUpdateUser = () => {
    return useContext(UpdateUserContext)
}

export const UserProvider = ({ value, children }) => {
    const [userName, setUserName] = useState(value)
    return (
        <UserContext.Provider value={userName}>
            <UpdateUserContext.Provider value={setUserName}>
                {children}
            </UpdateUserContext.Provider>
        </UserContext.Provider>
    )
}