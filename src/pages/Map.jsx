import React, { Fragment } from 'react';
import HeatMap from '../components/HeatMap';
import MissingForm from '../components/MissingForm';
import LastLocationMap from '../components/LastLocationMap';

export default function Map() {
	return (
		<Fragment>
			<HeatMap />
			<div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: '5fr 3fr', gridGap: '2rem' }}>
				<div>
					<MissingForm />
				</div>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<LastLocationMap />
				</div>
			</div>
		</Fragment>
	);
}
