import { Navigate, useRoutes } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem("token")

    if(!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children
}