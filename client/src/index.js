import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MainContextProvider from './Context/mainContext';
import {BrowserRouter} from 'react-router-dom';
import UploadContextProvider from './Context/UploadContext';
import(/*webpackChunkName: "app" */ './App').then(({default: App}) =>
	ReactDOM.render(
		<React.StrictMode>
			<MainContextProvider>
				<UploadContextProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</UploadContextProvider>
			</MainContextProvider>
		</React.StrictMode>,
		document.getElementById('root')
	)
);
