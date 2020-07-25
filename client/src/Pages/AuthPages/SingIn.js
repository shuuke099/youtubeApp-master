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
import Alert from '@material-ui/lab/Alert';

export default function SingIn(props) {
	const classes = useStyles();
	const [state, setState] = useState({email: '', password: ''});
	const [alert, setAlert] = useState({visible: false, color: '', message: ''});
	const {email, password} = state;

	const handleChange = (e) => {
		setState({...state, [e.target.name]: e.target.value});
	};
	console.log(email, password);
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {email, password};
		axios
			.post('api/v1/users/login', formData)
			.then((res) => {
				// console.log(res.data.data);
				if (res.data.status === 'success') {
					const user = {...res.data.data.user};

					window.localStorage.setItem('user', JSON.stringify(user));

					setAlert({...alert, visible: true, color: 'success', message: 'you successfully logged in '});
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
				<div className='auth-model'>
					<ThemeProvider theme={theme}>
						<Container>
							<CssBaseline />
							<div className={classes.paper}>
								<Avatar className={classes.avatar}>
									<LockOutlinedIcon />
								</Avatar>
								<Typography component='h1' variant='h5'>
									Sign in
								</Typography>
								<form className='sing-form' onSubmit={handleSubmit}>
									<div className='input-effect'>
										<label>Email adress</label>
										<input className='effect' type='email' name='email' placeholder='your@example.io' required='required' onChange={handleChange} />
									</div>
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
											<Link href='/singup' variant='body2'>
												{"Don't have an account? Sign Up"}
											</Link>
										</Grid>
									</Grid>
								</form>
							</div>
							<Box mt={3}>
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
			<Link color='inherit'>youtubeApp</Link> {new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '.2rem',
		width: '100% !important',
	},
	paper: {
		marginTop: theme.spacing(8),
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
