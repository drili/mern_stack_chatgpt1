import React from 'react'
import App from './App.jsx'
import Routes from './Routes.jsx'
import './tailwind.css';
import './index.css'
import * as ReactDOM from "react-dom/client";
import { UserProvider } from './context/UserContext.jsx';
import { initFlowbite } from 'flowbite';

ReactDOM.createRoot(document.getElementById('root')).render(
	<UserProvider>
		<Routes />
	</UserProvider>
)
