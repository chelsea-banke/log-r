import React, { useState, useContext } from "react";

const LogbookContext = React.createContext()
const UpdateLogbookContext = React.createContext()

export const useLogbook = () => {
    return useContext(LogbookContext)
}

export const useUpdateLogbook = () => {
    return useContext(UpdateLogbookContext)
}

export const LogbookProvider = ({ value, children }) => {
    const [LogbookName, setLogbookName] = useState(value)
    return (
        <LogbookContext.Provider value={LogbookName}>
            <UpdateLogbookContext.Provider value={setLogbookName}>
                {children}
            </UpdateLogbookContext.Provider>
        </LogbookContext.Provider>
    )
}