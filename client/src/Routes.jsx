import React from 'react';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from './components/Home';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home/>,
	},
    {
        path: "/login",
		element: <Login/>,

    },
    {
        path: "/register",
		element: <Register/>,

    }
]);

function Routes() {
    return (
        <RouterProvider router={router} />
    )
}

export default Routes;