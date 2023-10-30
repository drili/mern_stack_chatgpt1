import { Navigate, useRoutes } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token")
    const userRole = localStorage.getItem("user_role")

    if(!isAuthenticated || userRole !== "1") {
        return <Navigate to="/cannot-access" />
    }

    return children
}

export default AdminRoute