import React, {useContext} from 'react';
import {Route, Switch} from 'react-router-dom';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {MainContext} from './Context/mainContext';
import './App.css';

import LandingPage from './Pages/LandingPage';
import DetailPage from './Pages/DetailPage';
import UploadVideo from './Pages/UploadVideo/UploadVideo';
import SingIn from './Pages/AuthPages/SingIn';
import SingUp from './Pages/AuthPages/SingUp';
import Navbar from './Components/Navbar';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff',
			secondary: '#333',
		},
	},
});
function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<Navbar />
				<Switch>
					<Route exact path='/' component={LandingPage} />
					<Route exact path='/video/:id' component={DetailPage} />
					<Route exact path='/UploadVideo' component={UploadVideo} />
					<Route exact path='/SingIn' component={SingIn} />
					<Route exact path='/SingUp' component={SingUp} />
					<Route component={Error} />
				</Switch>
			</ThemeProvider>
		</>
	);
}

export default App;
