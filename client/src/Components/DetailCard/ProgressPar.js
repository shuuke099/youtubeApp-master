import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > * + *': {
			margin: 'auto',
		},
	},
}));

export default function LoadingProgressPar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress color='inherit' className="ciercle-progress"/>
		</div>
	);
}
