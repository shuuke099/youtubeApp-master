import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';
import {UploadContext} from '../../Context/UploadContext';
const SelectModel = () => {
	const {onDrop} = useContext(UploadContext);
	return (
		<div className='uploadPage'>
			<div className='model'>
				<div className='top-header container-fluid'>
					<h2 className='content-title upload title'>Upload videos</h2>
					<div className='left-content'>
						<button className='disapple'>Upload with Classic</button>
						<Link to='/'>
							<button className='close'>
								<CloseIcon />
							</button>
						</Link>
					</div>
				</div>
				<div className='select-body'>
					<form>
						<label className='uload-icon'>
							<input type='file' onChange={onDrop} name='video' accept='video/*' className='drop' />
							<PublishIcon className='uload-icon-puplic' />
						</label>
					</form>
					<div></div>
					<div className='select-content'>
						<h3 className='content-subtitle'>Drag and drop video files to upload</h3>
						<p className='text'>Your videos will be private until you publish them.</p>
					</div>
					<label className='btn btnselect'>
						<input type='file' name='video' accept='video/*' onChange={onDrop} />
						select files
					</label>
				</div>
				<div className='copy-right'>
					<p className='text'>
						By submitting your videos to YouTube, you acknowledge that you agree to YouTube's
						<a href='#' className='link'>
							{' '}
							Terms of Service{' '}
						</a>{' '}
						and
						<a href='#' className='link'>
							{' '}
							Community Guidelines.
						</a>{' '}
						Please be sure not to violate others' copyright or privacy rights.{' '}
						<a href='#' className='link'>
							Learn more
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SelectModel;
