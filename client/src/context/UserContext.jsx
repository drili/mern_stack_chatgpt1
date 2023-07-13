import React, { useEffect, useState } from "react"

const UserContext = React.createContext()

const UserProvider = ({ children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))

        setUser(storedUser)
        setLoading(false)
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            { loading ? (
                <div>Loading...</div>
            ) : (
                children
            )}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };