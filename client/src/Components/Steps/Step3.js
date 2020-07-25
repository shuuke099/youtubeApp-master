import React from 'react';
import {SingleRadioBoxes} from '../../Pages/UploadVideo/UloadUtilty';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import UploadedV from '../UploadedV';
import Subtitle from './stepOne/subtitle';

const Step3 = () => {
	return (
		<div className='stepGrid-field container'>
			<div className='video-visibilty'>
				<div className='visibilty-headertitles'>
					<h3 className='content-title'>Visibility</h3>
					<p className='text visibilty-text'>Choose when to publish and who can see your video.</p>
				</div>
				<div className='visibilty-body'>
					<div className='radio-title'>
						<FormControlLabel value='save' control={<Radio color='black' checked />} />
						<label className='save-title'>Save or Publish</label>
						{/* label='Save or Publish' className='save-label'/> */}
						<p className='text radio-text'>
							Make your video <strong>public, </strong> <strong> unlisted, </strong> <strong> or private </strong>
						</p>
						<div className='radio-inner'>
							<RadioGroup aria-label='gender' name='gender1'>
								{SingleRadioBoxes.map((single) => {
									return (
										<>
											<div className='single-radio'>
												<FormControlLabel value={single.label} control={<Radio color='black' />} label={single.label} />
											</div>
											<p className='text radio-text'>{single.text}</p>
										</>
									);
								})}
							</RadioGroup>
						</div>
					</div>
				</div>
				<div className='befor-Save'>
					<Subtitle
						Subtitles='Before you publish, check the following:'
						querys='Do kids appear in this video?'
						text='Make sure you follow our policies to protect minors from harm, exploitation, bullying, and violations of labor law.'
						link=' Learn more'
					/>
					<Subtitle
						querys='Looking for overall content guidance?'
						text='Our Community Guidelines can help you avoid trouble and ensure that YouTube remains a safe and vibrant community.'
						link=' Learn more'
					/>
				</div>
			</div>
			<UploadedV />
		</div>
	);
};

export default Step3;
