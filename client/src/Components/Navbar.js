import React, {useContext, useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Box, Drawer, AppBar, Toolbar, IconButton, Typography, InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles, fade} from '@material-ui/core/styles';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {MainContext} from '../Context/mainContext';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './navbar.css';
import {red} from '@material-ui/core/colors';

import {SideBarSm, SideBarLg} from './SideBar';
import {SidebarHistoryRight, SidebarLgHomeRight} from '../Pages/UploadVideo/UloadUtilty';
const Navbar = (props) => {
	const [expend, setExpend] = useState(false);
	const [manue, setManue] = useState(false);
	const user = JSON.parse(localStorage.getItem('user'));
	const classes = useStles();
	const {handleChange, handleSearch, handleSubmit} = useContext(MainContext);

	const ref = useRef(null);

	useEffect(() => {
		if (manue) {
			const handleSidebarRight = (e) => {
				if (ref.current && !ref.current.contains(event.target)) {
					setManue(false);
				}
			};

			document.addEventListener('click', handleSidebarRight);
			return () => {
				// Unbind the event listener on clean up
				document.removeEventListener('click', handleSidebarRight);
			};
		}
	});
	const onSubmit = () => {};
	const onDrop = (e) => {
		const file = e.target.files[0];
		const form = new FormData();
		const config = {
			header: {'content-type': 'multipart/form-data'},
		};
		form.append('photo', file);
		axios
			.patch('/api/v1/users/updateMe', form)
			.then((res) => {
				const user = {...res.data.data.user};
				window.localStorage.setItem('user', JSON.stringify(user));
				window.location.reload();
			})
			.catch((err) => console.log(err.response));
	};
	return (
		<>
			<Box component='nav' className={classes.root}>
				<AppBar elevation={0}>
					<Toolbar>
						<div className='navbar-context'>
							<div className='navbar-brands'>
								<IconButton edge='start' color='inherit' onClick={handleChange} className='hideIcons'>
									<MenuIcon />
								</IconButton>
								<Link to='/' className='router-link brand'>
									<YouTubeIcon className={classes.YouTubeIcon} />
									<h3 className='brand-text'>YouTube</h3>
								</Link>
							</div>
							<form className='search-form' onSubmit={(props, e) => handleSubmit(props, e)}>
								<input type='text' name='search' placeholder='search...' className='input-large' onChange={handleSearch} />
								<button className='search-icon'>
									<SearchIcon />
								</button>
							</form>
							<div className='deskIcons'>
								<div className={expend ? 'searchIcon-expand' : 'search-small'}>
									<div className='arrow-icon'>
										<ArrowBackIcon onClick={() => setExpend(false)} />
									</div>
									{expend ? (
										<form className='input-expand-wrap' onSubmit={(props, e) => handleSubmit(props, e)}>
											<input type='text' placeholder='search...' className='input-small' onChange={handleSearch} />
											<button className='search-small-icon'>
												<SearchIcon />
											</button>
										</form>
									) : (
										<div className='input-expand-wrap expand-wrap-icon'>
											<SearchIcon className='search-small-icon' onClick={() => setExpend(true)} />
										</div>
									)}
								</div>
								{user ? (
									<Link to='/UploadVideo' className='router-link'>
										<IconButton aria-label='show 4 new mails' color='inherit'>
											<VideoCallIcon />
										</IconButton>
									</Link>
								) : (
									<Link to='/singIn' className='router-link'>
										<IconButton aria-label='show 4 new mails' color='inherit'>
											<VideoCallIcon />
										</IconButton>
									</Link>
								)}
								<IconButton aria-label='show 17 new notifications' color='inherit' className='hideIcons'>
									<AppsIcon />
								</IconButton>
								<IconButton
									edge='end'
									aria-label='account of current user'
									// aria-controls={menuId}
									aria-haspopup='true'
									// onClick={handleProfileMenuOpen}
									color='inherit'
								>
									{user ? (
										<div className='avatar creator-info'>
											<img
												src={`../../public/users/${user.photo}`}
												alt='user-avatar'
												className='avatar-pic'
												onClick={() => {
													if (!manue) setManue(true);
												}}
											/>
										</div>
									) : (
										<Link to='/Singup'>
											<div className='singup-acount'>
												<AccountCircle className='singup-acount-icon' />
												<div className='signup-acount-text'>sign up</div>
											</div>
										</Link>
									)}
								</IconButton>
							</div>
						</div>
					</Toolbar>
				</AppBar>
			</Box>
			{user && (
				<div className={manue ? 'sidebar-right' : 'sidebar-right-toggle'} ref={ref}>
					<div className='sidebar-lg'>
						<div className='sidebar-right-hedader'>
							<div className='avatar'>
								<img src={`../../../public/users/${user.photo}`} alt='user-avatar' className='avatar-pic' />
							</div>
							<div className='card-body-content'>
								<h4>Shuuke Yare</h4>
								<h5 style={{color: '#8b8b8b'}}>{user.email}</h5>
								<h5>
									<label style={{color: 'blue', cursor: 'pointer'}}>
										<input type='file' name='video' accept='image/*' onChange={onDrop} />
										Change your image
									</label>
								</h5>
							</div>
						</div>
						<div className='line-Defider'></div>
						,
						<SideBarLg SidebarLgHome={SidebarLgHomeRight} SidebarHistory={SidebarHistoryRight} exit />
					</div>
				</div>
			)}
			<div className='sidebar-bottom'>
				<SideBarSm />
			</div>
		</>
	);
};

const useStles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		position: 'fixed',
		top: 0,
		right: 0,
		left: 0,
		zIndex: '100',
		backgroundColor: '#ffffff !important',
	},

	YouTubeIcon: {
		width: '2.5rem',
		height: '1.8rem',
		color: '#ff0000 !important',
	},

	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: 'rgba(0, 0, 0, 0.04)',
		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, 0.08)',
		},
		marginRight: theme.spacing(2),
		// marginLeft: '5rem',
		// width: '0',
		// [theme.breakpoints.up('sm')]: {
		// 	marginLeft: 'auto',
		// 	width: '40%',
		// },
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		// position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: '1rem',
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '100% !important',
		},
	},
}));

export default Navbar;
