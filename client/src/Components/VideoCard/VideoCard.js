import React from 'react';
import './VideoCard.css';
import axios from 'axios';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WatchLaterIcon from '@material-ui/icons/WatchLaterSharp';
import {Grid} from '@material-ui/core';
import PlaylistIcon from '@material-ui/icons/PlaylistAddRounded';
import PlayIcon from '@material-ui/icons/PlayArrowRounded';
import {Link} from 'react-router-dom';
import Video from './Video';

const VideoCard = ({toggle, video}) => {
	const {
		thumbnail,
		title,
		description,
		views,
		duration,
		creator: {photo, name},
		_id,
	} = video;

	const minutes = Math.floor(duration / 60);
	const seconds = Math.floor(duration - minutes * 60);

	return (
		<Link to={`/video/${_id}`}>
			<div className='Vcard'>
				<Video minutes={minutes} seconds={seconds} thumbnail={thumbnail} />
				<div className='Vcard-body'>
					<div className='avatar'>
						<img src={`../../../public/users/${photo}`} alt='user-avatar' className='avatar-pic' />
					</div>
					<div className='card-body-content'>
						<h3 className='content-subtitle video-title'>{title}</h3>
						<div className='view'>
							<p className='view-text'>{name}</p>
							<p className='view-text '>
								<span>{views}</span> views * {''} <span> {moment(video.createdAt, 'YYYYMMDD').fromNow()}</span>{' '}
							</p>
						</div>
					</div>
					<div className='moreVert-icon'>
						<MoreVertIcon />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default VideoCard;
