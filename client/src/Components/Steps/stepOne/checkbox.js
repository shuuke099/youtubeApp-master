import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {green} from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {useState} from 'react';

const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		fontSize: '1.2rem',
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})((props) => <Checkbox {...props} />);

export default function Checkboxs() {
	const [checkedA, setCheckA] = useState(false);
	const [checkBdisaple, setDisaple] = useState(true);
	const [checkedB, setCheckB] = useState(false);

	const handlecheckedA = (e) => {
		setCheckA(e.target.checked);
		setDisaple(false);
	};
	const handlecheckedB = (e) => {
		setCheckB(e.target.checked);
	};

	return (
		<FormGroup>
			<FormControlLabel
				control={<Checkbox color='default' checked={checkedA} onChange={handlecheckedA} name='checkedA' />}
				label='My video contains paid promotion like a product placement or endorsement'
			/>
			<FormControlLabel
				control={<Checkbox color='default' checked={checkedB} onChange={handlecheckedB} name='checkedA' disabled={checkBdisaple} />}
				label='Add a message to my video to inform viewers of paid promotion'
			/>
		</FormGroup>
	);
}
