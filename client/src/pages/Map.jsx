import React, { Fragment } from 'react';
import HeatMap from '../components/HeatMap';
import MissingForm from '../components/MissingForm';
import LastLocationMap from '../components/LastLocationMap';
import {Typography} from '@material-ui/core'

export default function Map() {
	return (
		<Fragment>
			<HeatMap />
			<div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '4fr 4fr', gridGap: '2rem' }}>
				<div>
					<MissingForm />
				</div>
				<div style={{ display: 'flex',flexDirection:'column' }}>
					<Typography variant="h4" style={{marginBottom:'2rem',color : 'white',padding : '.7rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
					Choost Last Location
				</Typography>
					<LastLocationMap />
				</div>
			</div>
		</Fragment>
	);
}
