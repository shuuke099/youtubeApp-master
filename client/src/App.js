import React, {useContext} from 'react';
import {Route, Switch} from 'react-router-dom';

import {MainContext} from './Context/mainContext';
import './App.css';

import LandingPage from './Pages/LandingPage';
import DetailPage from './Pages/DetailPage';
import UploadVideo from './Pages/UploadVideo/UploadVideo';
import SingIn from './Pages/AuthPages/SingIn';
import SingUp from './Pages/AuthPages/SingUp';
import Navbar from './Components/Navbar';

function App() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/video/:id' component={DetailPage} />
				<Route exact path='/UploadVideo' component={UploadVideo} />
				<Route exact path='/SingIn' component={SingIn} />
				<Route exact path='/SingUp' component={SingUp} />
				<Route component={Error} />
			</Switch>
		</>
	);
}

export default App;
