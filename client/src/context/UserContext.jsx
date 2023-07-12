import React, { useEffect, useState } from "react"

const UserContext = React.createContext()

const UserProvider = ({ children}) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))

        setUser(storedUser)
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };