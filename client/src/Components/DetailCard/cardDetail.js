import React, {useState, useEffect} from 'react';
import axios from 'axios';
import moment from 'moment';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {CardMedia, Card, Divider, CardHeader, Avatar, IconButton, Typography, Button, Box} from '@material-ui/core/';
import {red} from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {ThumbUp, ThumbDown, PlaylistAdd, MoreHorizTwoTone} from '@material-ui/icons';
import CommentList from '../CommentList';
import LikeDisLike from './likeDislike';

export default function CardDetail({video, views, options, props}) {
	const user = JSON.parse(localStorage.getItem('user'));
	const classes = useStles();
	const [subscribe, setSubscribe] = useState(0);
	const [subscribed, setSubscribed] = useState(false);
	const [showDescription, setShowdescription] = useState(false);
	const {title, description, videoPath, createdAt, creator, thumbnail, _id} = video;
	let userFrom;
	let userTo;
	if (user) {
		userFrom = user._id;
		userTo = creator._id;
	}
	const subsOptions = {
		userFrom,
		userTo,
	};
	useEffect(() => {
		axios
			.post('/api/v1/subscribes/getUserSubs', subsOptions)
			.then((res) => {
				if (res.data.success) {
					setSubscribe(res.data.doc.length);

					res.data.doc.map((singleSub) => {
						if (singleSub.userFrom === userFrom) {
							setSubscribed(true);
						}
					});
				}
			})
			.catch((err) => console.log(err.response));
	}, []);

	const handleSubs = () => {
		if (subscribed) {
			setSubscribe((subs) => subs - 1);
			setSubscribed(false);
			axios
				.post(`/api/v1/subscribes/unSubscribe`, subsOptions)
				.then().catch((err) => console.log(err.response));
		} else {
			setSubscribe((subs) => subs + 1);
			setSubscribed(true);
			axios
				.post('/api/v1/subscribes', subsOptions)
				.then()
				.catch((err) => console.log(err.response));
		}
	};

	return (
		<div className='Dcard'>
			<video src={`../../public/Videouploads/${videoPath}`} style={{width: '100%', height: '65vh'}} controls autoPlay muted className='video'>
				{' '}
			</video>
			<Typography variant='h6' className={classes.topTitle}>
				{' '}
				{title}
			</Typography>
			<div className={classes.views}>
				<Typography style={{fontSize: '12px'}}>
					<span>{views}</span> views * {''} <span> {moment(createdAt, 'YYYYMMDD').fromNow()}</span>{' '}
				</Typography>
				<div className='like'>
					<LikeDisLike options={options} model={video} props={props} user={user} />
					<IconButton>
						<PlaylistAdd />
						<Typography style={{marginLeft: '2px', fontSize: '12px'}}>save</Typography>
					</IconButton>
					<IconButton aria-label='settings'>
						<MoreHorizTwoTone />
					</IconButton>
				</div>
			</div>
			<Divider />
			<div className='Dcard-body'>
				<div className='avatar creator-info'>
					<img src={`../../../public/users/${creator.photo}`} alt='user-avatar' className='avatar-pic' />
					<div className='creator-info-title'>
						<h3 className='creattor-title'>{creator.name}</h3>
						<p style={{marginLeft: '2px', fontSize: '12px'}}>{subscribe} subscribers</p>
					</div>
				</div>
				{user ? (
					<div className='subs-btn'>
						{subscribed ? (
							<button className='btn btn-subscribed' onClick={handleSubs}>
								subscribed
							</button>
						) : (
							<button className='btn btn-subscribe' onClick={handleSubs}>
								subscribe
							</button>
						)}
					</div>
				) : (
					<button
						className='btn btn-subscribe'
						onClick={() => {
							alert('log In please');
							console.log(props);
							props.history.push('/singIn');
						}}
					>
						subscribe
					</button>
				)}
			</div>
			<div className='detail-discription'>
				<div className={showDescription ? 'discriotion-content discription' : 'discriotion-content'}>
					<p>{description}</p>
				</div>
				<button className='btn btn-transparent' onClick={() => setShowdescription(!showDescription)}>
					Show more
				</button>
			</div>
			<div className='line'></div>
			<Box>
				<CommentList options={options} user={user} props={props} />
			</Box>
		</div>
	);
}

const useStles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '100%',
		background: 'transparent',
		boxShadow: 'none',
		[theme.breakpoints.down('sm')]: {
			margin: '.7rem auto',
		},
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	avatar: {
		backgroundColor: red[500],
	},
	topTitle: {
		paddingTop: '1.2rem',
		textTransform: 'capitalize',
	},
	views: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 0,
	},

	subRed: {
		background: 'red',
		textTransform: 'upperCase',
		color: '#fff',
		marginTop: '1px',

		'&hover': {
			background: 'green',
		},
	},
}));
