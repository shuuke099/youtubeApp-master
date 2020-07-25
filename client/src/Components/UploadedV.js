import React, {useContext} from 'react';
import {UploadContext} from '../Context/UploadContext';
const UploadedV = () => {
	const {videoflie, videoPath} = useContext(UploadContext);
	console.log(videoflie);

	return (
		<div className='uplaoded-video'>
			<div className='card'>
				{videoPath === '' ? (
					<div className='video-top'>
						<h5>uploading video...</h5>
					</div>
				) : (
					<video src={`../../public/Videouploads/${videoPath}`} controls autoPlay muted alt='' className='video-top video'></video>
				)}
				<div className='uplaoded-body'>
					<small>video link</small>
					<p className='v-link link'>
						<a href=''>{`https://youtu.be/${videoflie.type}`}</a>
					</p>
					<small>filename</small>
					<p>{videoflie.name}</p>
				</div>
			</div>
		</div>
	);
};

export default UploadedV;
