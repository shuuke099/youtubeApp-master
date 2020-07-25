import React from 'react';

import ErrorOutlineICon from '@material-ui/icons/ErrorOutline';
import VideoTwoToneIcon from '@material-ui/icons/FeaturedVideoTwoTone';
import Button from '@material-ui/core/Button';
const Step2 = () => {
	return (
		<div className='video-element container'>
			<div className='element-headertitles'>
				<h3 className='content-title'>Video elements</h3>
				<p className='text element-text'>
					Use cards and an end screen to show viewers related videos, websites, and calls to action. <a href='#'>Learn more</a>{' '}
				</p>
			</div>
			<div className='element-body'>
				<div className='el-inner-start'>
					<div className='el-iiner-icon'>
						<VideoTwoToneIcon />
					</div>
					<div>
						<h5 className='e-inner-title'>Add an end screen</h5>
						<p className='text'>Promote related content at the end of your video</p>
					</div>
				</div>
				<div className='element-inner-end'>
					<Button className='material-btn'>IMPORT FROM VIDEO</Button>
					<Button className='material-btn'>ADD</Button>
				</div>
			</div>
			<div className='element-body'>
				<div className='el-inner-start'>
					<div className='el-iiner-icon'>
						<ErrorOutlineICon />
					</div>
					<div>
						<h5 className='e-inner-title'>Add cards</h5>
						<p className='text'>Promote related content during your video</p>
					</div>
				</div>
				<div className='element-inner-end'>
					<Button color='primary' className='material-btn'>
						ADD
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Step2;
