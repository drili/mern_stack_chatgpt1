import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './components/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import CreateTask from './pages/CreateTask';
import CreateCustomer from './pages/CreateCustomer';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                    path="/*" 
                    element={
                        <Layout>
                            <Routes>
                                <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                                <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                                <Route path="create-task" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
                                <Route path="create-customer" element={<ProtectedRoute><CreateCustomer /></ProtectedRoute>} />
                            </Routes>
                        </Layout>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
