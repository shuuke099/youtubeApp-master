import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioBtn() {
	const [value, setValue] = React.useState('');

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<FormControl component='fieldset'>
			<RadioGroup aria-label='gender' name='gender1' value={value} onChange={handleChange}>
				<FormControlLabel value='yes' control={<Radio color='default' />} label="YEs, it's not made for kids" />
				<FormControlLabel value='no' control={<Radio color='default' />} label="No, it's not made for kids" />
			</RadioGroup>
		</FormControl>
	);
}
