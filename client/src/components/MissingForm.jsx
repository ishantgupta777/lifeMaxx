import React from 'react';
import FormComponent from '../components/FormComponent';

const MissingForm = () => {
	return (
		<div style={{ marginBottom: '5rem' }}>
			<FormComponent lastLocation unsafe />
		</div>
	);
};

export default MissingForm;
