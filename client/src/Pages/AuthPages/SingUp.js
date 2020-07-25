import React, {useState} from 'react';
import axios from 'axios';
import './auth.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ThemeProvider} from '@material-ui/styles';
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import ShowAlert from '../../Components/Alert';

export default function SingUp(props) {
	const [state, setState] = useState({name: '', email: '', password: '', passwordConfirm: ''});
	const [alert, setAlert] = useState({visible: false, color: '', message: ''});
	const {name, email, password, passwordConfirm} = state;
	const classes = useStyles();

	const handleChange = (e) => {
		setState({...state, [e.target.name]: e.target.value});
	};
	console.log(email, name, password, passwordConfirm);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {email, name, password, passwordConfirm};
		axios
			.post('api/v1/users/signup', formData)
			.then((res) => {
				console.log(res.data.data);
				if (res.data.status === 'success') {
					const user = {...res.data.data.user};
					window.localStorage.setItem('user', JSON.stringify(user));
					setAlert({...alert, visible: true, color: 'success', message: 'successfully created your Account'});
					setTimeout(() => {
						setAlert({...alert, visible: false});
						props.history.push('/');
						window.location.reload();
					}, 3000);
				}
			})
			.catch((err) => {
				setAlert({...alert, visible: true, color: 'error', message: err.response.data.message});
				setTimeout(() => {
					return setAlert({...alert, visible: false});
				}, 5000);
				console.log(err.response);
			});
	};
	return (
		<div className='auth-page'>
			{alert.visible && (
				<div className='alert'>
					<ShowAlert severity={alert.color} text={alert.message} />
				</div>
			)}
			<div className='auth-model signup-model'>
				<ThemeProvider theme={theme}>
					<Container className='auth-container'>
						<CssBaseline />
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Sign up
							</Typography>
							<form className='sing-form' onSubmit={handleSubmit}>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<div className='input-effect'>
											<label>Name</label>
											<input className='effect' type='text' name='name' placeholder='Enter name...' required='required' onChange={handleChange} />
										</div>
									</Grid>
									<Grid item xs={6}>
										<div className='input-effect'>
											<label>Email</label>
											<input className='effect' type='email' name='email' placeholder='your@example.io' required='required' onChange={handleChange} />
										</div>
									</Grid>
									<Grid item xs={6}>
										<div className='input-effect'>
											<label>password</label>
											<input
												className='effect effect-password'
												type='password'
												name='password'
												placeholder='••••••••'
												required='required'
												minLength='8'
												onChange={handleChange}
											/>
										</div>
									</Grid>
									<Grid item xs={6}>
										<div className='input-effect'>
											<label>password Confirm</label>
											<input
												className='effect effect-password'
												type='password'
												name='passwordConfirm'
												placeholder='••••••••'
												required='required'
												minLength='8'
												onChange={handleChange}
											/>
										</div>
									</Grid>
								</Grid>
								<FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
								<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
									Sign In
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href='#' variant='body1' style={{fontSize: '13px'}}>
											Forgot password?
										</Link>
									</Grid>
									<Grid item>
										<Link href='/singin' variant='body2'>
											{'I have an account? Sign In'}
										</Link>
									</Grid>
								</Grid>
							</form>
						</div>
						<Box mt={2}>
							<Copyright />
						</Box>
					</Container>
				</ThemeProvider>
			</div>
		</div>
	);
}
function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));
const theme = createMuiTheme({
	palette: {
		primary: blue,
	},
});
