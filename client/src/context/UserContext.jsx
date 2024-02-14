import React, { useEffect, useState } from "react"

const UserContext = React.createContext()

const UserProvider = ({ children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false)

    useEffect(() => {
        if (!user) {
            const storedUser = JSON.parse(localStorage.getItem("user"))
            setUser(storedUser)
        }

        setLoading(false)
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, hasUnreadNotifications, setHasUnreadNotifications }}>
            { loading ? (
                <div>Loading...</div>
            ) : (
                children
            )}
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext };