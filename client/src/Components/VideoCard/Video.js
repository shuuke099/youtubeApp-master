import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WatchLaterIcon from '@material-ui/icons/WatchLaterSharp';
import PlaylistIcon from '@material-ui/icons/PlaylistAddRounded';
import PlayIcon from '@material-ui/icons/PlayArrowRounded';
const Video = ({minutes, seconds, thumbnail}) => {
	return (
		<>
			<div className='card-header'>
				<img src={`../../../public/Videouploads/thumbnails/${thumbnail}`} alt='main-vedio' className='v-top' />
				<div className='icons-top'>
					<div className='icon-top watch-icon'>
						<p className='icon-top-text'>watch later</p>

						<WatchLaterIcon className='single-top-icon' />
					</div>
					<div className='icon-top play-list-icon'>
						<p className='icon-top-text'>add to queue</p>

						<PlaylistIcon className='single-top-icon' />
					</div>
				</div>
				<div className='play-con-wrapper'>
					<PlayIcon className='play-con' />
				</div>
				<div className='timePatch'>
					<p>
						{minutes}:{seconds}
					</p>
				</div>
			</div>
		</>
	);
};

export default Video;
