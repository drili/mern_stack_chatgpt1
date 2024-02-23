import React from 'react'
import * as ReactDOM from "react-dom/client";
import { initFlowbite } from 'flowbite';

import './tailwind.css';
import './index.css'

import App from './App.jsx'
import Routes from './Routes.jsx'

import { UserProvider } from './context/UserContext.jsx';
import { ConfigProvider } from './context/ConfigContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ConfigProvider>
		<UserProvider>
			<Routes />
		</UserProvider>
	</ConfigProvider>
)
