import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './components/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import CreateTask from './pages/CreateTask';
import CreateCustomer from './pages/CreateCustomer';
import Customers from './pages/Customers';
import Workflow from './pages/Workflow';
import NotFound from './pages/NotFound';
import SprintOverview from './pages/SprintOverview';
import TimeRegistrations from './pages/TimeRegistrations';
import RegisterOffTimes from './pages/RegisterOffTimes';

import Admin from './pages/admin/Admin';
import TimeRegistrationsOverview from './pages/admin/TimeRegistrationsOverview';
import CannotAccess from './pages/CannotAccess';

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
                                <Route path="sprint-overview" element={<ProtectedRoute><SprintOverview/></ProtectedRoute>} />
                                <Route path="time-registrations" element={<ProtectedRoute><TimeRegistrations/></ProtectedRoute>} />
                                <Route 
                                    path="customers"
                                >
                                    <Route index={true} element={<Customers />}></Route>
                                    <Route path="create-customer" element={<ProtectedRoute><CreateCustomer /></ProtectedRoute>} />
                                </Route>
                                {/* <Route path="create-customer" element={<ProtectedRoute><CreateCustomer /></ProtectedRoute>} /> */}
                                <Route path="workflow" element={<ProtectedRoute><Workflow /></ProtectedRoute>} />
                                <Route path="register-offtime" element={<ProtectedRoute><RegisterOffTimes /></ProtectedRoute>} />
                                
                                <Route path="admin" element={<ProtectedRoute>
                                    <AdminRoute>
                                        <Admin/>
                                    </AdminRoute>
                                </ProtectedRoute>} />
                                <Route path="admin/time-registrations-overview" element={<ProtectedRoute>
                                    <AdminRoute>
                                        <TimeRegistrationsOverview/>
                                    </AdminRoute>
                                </ProtectedRoute>} />
                                <Route path="cannot-access" element={
                                    <ProtectedRoute><CannotAccess/></ProtectedRoute>
                                }/>
                                <Route path="*" element={<NotFound/>} />
                            </Routes>
                        </Layout>
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
