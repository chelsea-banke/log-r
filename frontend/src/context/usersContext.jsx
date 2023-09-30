import React, { useState, useContext } from "react";

const UsersContext = React.createContext()
const UpdateUsersContext = React.createContext()

export const useUsers = () => {
    return useContext(UsersContext)
}

export const useUpdateUsers = () => {
    return useContext(UpdateUsersContext)
}

export const UsersProvider = ({ value, children }) => {
    const [usersName, setUsersName] = useState(value)
    return (
        <UsersContext.Provider value={usersName}>
            <UpdateUsersContext.Provider value={setUsersName}>
                {children}
            </UpdateUsersContext.Provider>
        </UsersContext.Provider>
    )
}