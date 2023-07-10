import React from 'react'
import App from './App.jsx'
import Routes from './Routes.jsx'
import './index.css'
import * as ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Routes />
	</React.StrictMode>,
)
