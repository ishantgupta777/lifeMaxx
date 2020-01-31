import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormComponent from '../components/FormComponent';
import SafePeople from '../components/SafePeople';

const useStyles = makeStyles((theme) => ({
	card: {
		minWidth: 275,
		maxWidth: 800
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
}));

const PersonForm = () => {
	const classes = useStyles();
	return (
		<div style={{ display: 'grid', gridTemplateColumns: '4fr 4fr', gridGap: '1rem' }}>
			<Card className={classes.card} style={{ flexBasis: '60' }}>
				<CardContent>
					<FormComponent rescueCentre />
				</CardContent>
			</Card>
			<Card className={classes.card} style={{ flexBasis: '30' }}>
				<CardContent>
					<SafePeople />
				</CardContent>
			</Card>
		</div>
	);
};

export default PersonForm;
