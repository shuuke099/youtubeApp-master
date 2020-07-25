import React, {useContext} from 'react';
import SubtitleList from './subtitleList';
import UploadedV from '../../UploadedV';
import {UploadContext} from '../../../Context/UploadContext';

const Step1 = () => {
	const {inputStates, handleChange} = useContext(UploadContext);
	const {title, description} = inputStates;

	return (
		<div className='stepGrid-field container'>
			<div className='detail'>
				<h2 className='content-title'>Details</h2>
				<form className='detail-form'>
					<div className='input-groups'>
						<label htmlFor='title'>title</label>
						<input
							type='text'
							name='title'
							placeholder='title'
							id='title'
							value={title}
							className='inputs'
							required='required'
							onChange={handleChange}
						/>
					</div>
					<div className='input-groups'>
						<label htmlFor='description'>description</label>
						<input
							type='text'
							name='description'
							placeholder='tell your viewers about your video'
							id='description'
							className=' inputs description-input'
							required='required'
							value={description}
							onChange={handleChange}
						/>
					</div>
				</form>
				<SubtitleList />
			</div>
			<UploadedV />
		</div>
	);
};

export default Step1;
