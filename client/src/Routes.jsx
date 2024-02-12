import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/admin/Register';
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
import Notifications from "./pages/Notifications"

import Admin from './pages/admin/Admin';
import TimeRegistrationsOverview from './pages/admin/TimeRegistrationsOverview';
import PersonsOverview from './pages/admin/PersonsOverview';
import CannotAccess from './pages/CannotAccess';
import UserNotActivated from './pages/functionalities/UserNotActivated';
import GeneralFeatures from './pages/admin/GeneralFeatures';
import TaskVerticalsOverview from './pages/admin/TaskVerticalsOverview';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user-not-activated" element={<UserNotActivated/>}/>

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
                                <Route path="notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                                
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
                                <Route path="admin/persons-overview" element={<ProtectedRoute>
                                    <AdminRoute>
                                        <PersonsOverview/>
                                    </AdminRoute>
                                </ProtectedRoute>} />
                                <Route path="admin/register" element={<ProtectedRoute>
                                    <AdminRoute>
                                        <Register/>
                                    </AdminRoute>
                                </ProtectedRoute>} />
                                <Route path="admin/general-features" element={<ProtectedRoute>
                                    <AdminRoute>
                                        <GeneralFeatures/>
                                    </AdminRoute>
                                </ProtectedRoute>} />
                                <Route path="admin/task-verticals-overview" element={<ProtectedRoute>
                                    <AdminRoute>
                                        <TaskVerticalsOverview/>
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
