import { Navigate, useRoutes } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem("token")
    const isActivated = localStorage.getItem("is_activated") === "true"

    if(!isAuthenticated) {
        return <Navigate to="/login" />
    } else if (isAuthenticated && !isActivated) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        // localStorage.clear();

        return <Navigate to="/user-not-activated" />
    }

    return children
}