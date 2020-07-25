import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1, 0),
		minWidth: 180,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export function FormSelector({items, state, name, handleChange}) {
	const classes = useStyles();

	return (
		<FormControl variant='outlined' className={`${classes.formControl} form-select`}>
			<InputLabel>{`select ${name}`}</InputLabel>
			<Select
				labelId='language'
				name={name}
				id='demo-simple-select-outlined'
				onChange={(e) => handleChange(e)}
				label='select'
				className='input-select text-reduce'
				value={state}
			>
				{items.map((item) => {
					return (
						<MenuItem value={item} key={item}>
							{item}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}

export function CommentForm({items, state, handleChange}) {
	const classes = useStyles();
	return (
		<FormControl variant='outlined' className={`${classes.formControl}  form-select`}>
			<InputLabel>select</InputLabel>
			<Select
				labelId='comment'
				name='comment'
				id='demo-simple-select-outlined'
				value={state}
				onChange={(e) => handleChange(e)}
				label='select'
				className=' input-select text-reduce'
			>
				{items.map((item) => {
					return (
						<MenuItem value={item.value} key={item.label}>
							{item.label}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}
