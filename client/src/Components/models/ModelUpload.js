import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import {steps, getActiveStep} from '../../Pages/UploadVideo/UloadUtilty';
import {UploadContext} from '../../Context/UploadContext';
import ShowAlert from '../Alert';

const UploadModel = ({props}) => {
	const {uploadedPercent, alert, createVideo} = useContext(UploadContext);
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);

	const nextStep = () => {
		if (activeStep === steps.length - 1) {
			createVideo(props);
		} else {
			setActiveStep((preState) => preState + 1);
		}
	};
	const preStep = () => {
		setActiveStep((preState) => preState - 1);
	};

	return (
		<div className='uploadPage'>
			{alert.visible && (
				<div className='alert'>
					<ShowAlert severity={alert.color} text={alert.message} />
				</div>
			)}
			<div className='model'>
				<div className='top-header container-fluid'>
					<h2 className='content-title'>video1</h2>
					<div className='left-content'>
						<button className='disapple'>save as draft</button>
						<button className='close'>
							<CloseIcon />
						</button>
					</div>
				</div>
				{/* header */}
				<div className='header'>
					{/* steps */}
					<div className='steps'>
						{steps.map((step, index) => {
							return (
								<div className='step' key={index}>
									<div className={index <= activeStep ? 'patch active-batch' : 'patch disaple-batch'}>{index + 1}</div>
									<h3 className='content-subtitle'>{step}</h3>
									<div className='line'></div>
								</div>
							);
						})}
					</div>
				</div>
				{/* active step */}
				<div className='active-steps'>{getActiveStep(activeStep)}</div>
				<div className='footer container'>
					<div className='progress-wraper'>
						{uploadedPercent > 0 && (
							<div className='progress'>
								<div className='progrsspar'>
									<span style={{width: `${uploadedPercent}%`}}></span>
								</div>
								<p className='progress-percent'>{uploadedPercent}%</p>
								<p>Uploaded</p>
							</div>
						)}
					</div>
					<div className='buttons'>
						<button className={activeStep >= steps.length - 2 ? 'btn btn-back' : 'btn-back-none'} onClick={preStep}>
							back
						</button>
						<button className='btn next-btn' onClick={nextStep}>
							{activeStep === steps.length - 1 ? 'Save' : 'next'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

function LinearProgressWithLabel(props) {
	return (
		<Box display='flex' alignItems='center'>
			<Box width='100%' mr={1}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant='body2' color='textSecondary'>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};
const useStyles = makeStyles({
	root: {
		width: '30%',
	},
	progress: {
		background: 'blue',
	},
});

export default UploadModel;
