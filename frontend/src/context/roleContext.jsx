import React, { useState, useContext } from "react";

const RoleContext = React.createContext()
const UpdateRoleContext = React.createContext()

export const useRole = () => {
    return useContext(RoleContext)
}

export const useUpdateRole = () => {
    return useContext(UpdateRoleContext)
}

export const RoleProvider = ({ value, children }) => {
    const [roleName, setRoleName] = useState(value)
    return (
        <RoleContext.Provider value={roleName}>
            <UpdateRoleContext.Provider value={setRoleName}>
                {children}
            </UpdateRoleContext.Provider>
        </RoleContext.Provider>
    )
}