import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card, Divider, CardHeader, Avatar, IconButton, Typography, CardMedia, Button, CardContent} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Video from '../VideoCard/Video';
const useStyles = makeStyles({
	root: {
		display: 'flex',
		height: 100,
		marginBottom: '.7rem',
		background: 'transparent',
		boxShadow: 'none',
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		marginLeft: '.7rem',
	},
});

export default function DetailSide({singleVideo, createView}) {
	const classes = useStyles();
	const {
		thumbnail,
		title,
		views,
		duration,
		creator: {name},
		_id,
	} = singleVideo;
	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration - minutes * 60);
	return (
		<>
			<Link
				to={`/video/${singleVideo._id}`}
				onClick={() => {
					setTimeout(() => {
						window.location.reload();
					}, 1000);
				}}
			>
				<div className='Vcard Side-Card'>
					<Video minutes={minutes} seconds={seconds} thumbnail={thumbnail} />
					<div className={classes.details}>
						<Typography className='video-title side-title'>{singleVideo.title}</Typography>
						<Typography color='textSecondary' style={{fontSize: '14px'}}>
							{singleVideo.creator.name}
						</Typography>
						<Typography style={{fontSize: '14px'}} color='textSecondary'>
							1.5k views * <span> {moment(singleVideo.createdAt, 'YYYYMMDD').fromNow()}</span>
						</Typography>
					</div>
				</div>
			</Link>
		</>
	);
}
