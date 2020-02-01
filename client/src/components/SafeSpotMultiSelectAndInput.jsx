import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem, TextField, Button,Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import './SafeSpotForm.css';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: 200
		}
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300
	},
	noLabel: {
		marginTop: theme.spacing(3)
	}
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
		}
	}
};

const names = [ 'Flood', 'Earthquake', 'Cyclone' ];

export default function MultipleSelect() {
  const classes = useStyles();
  const [suggestions,setSuggestions] = useState([])
  const [ personName, setPersonName ] = React.useState([]);
  const [value, setValue] = React.useState(null);

	const handleChange = (event) => {
		setPersonName(event.target.value);
	};
  const handleTextSelect = (e)=>{
    e.preventDefault()
    setValue(e.target.value)
  }
	const handleTextChange = async (e) => {
		const text = e.target.value;
		const response = await axios.get(
			`https://www.mapquestapi.com/geocoding/v1/address?key=ekC8XsButuiKAx0FzPDfCxNBxOeZoZPV&location=${text}`
    );
    setSuggestions(response.data.results[0].locations)
	};

	const handleSubmit = async (e) => {
		document.getElementById('after-submit-2').innerText = "Submitted"
    e.preventDefault()
    const response = await axios.get(
      `https://www.mapquestapi.com/geocoding/v1/address?key=ekC8XsButuiKAx0FzPDfCxNBxOeZoZPV&location=${value}`)
      const latLng = response.data.results[0].locations[0].latLng
      for(var i=0;i<personName.length;i++){
        const safeSpot = await axios.post(`/addSafeSpot`,{
          lat : latLng.lat,
          long : latLng.lng,
          disaster_type: personName[i]
        })
      }
	}

	return (
		<div>
			<form onSubmit={handleSubmit} method="POST" >
				<FormControl style={{ width: '80%', margin: 'auto' }} >
					<InputLabel id="mutiple-checkbox-label">Choose Category</InputLabel>
					<Select
						labelId="mutiple-checkbox-label"
						id="mutiple-checkbox"
						multiple
						required
						value={personName}
						onChange={handleChange}
						input={<Input />}
						renderValue={(selected) => selected.join(', ')}
						MenuProps={MenuProps}
					>
						{names.map((name) => (
							<MenuItem key={name} value={name} style={{ margin: 'auto' }}>
								<Checkbox checked={personName.indexOf(name) > -1} style={{ margin: 'auto' }} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
          <Autocomplete
            id="safe-spot-suggestion"
            autocomplete
            options={suggestions}
            getOptionLabel={({adminArea6,adminArea5,adminArea4,adminArea3,adminArea1}) => adminArea6+' '+adminArea5+' '+adminArea4+' '+adminArea3+' '+adminArea1}
            renderInput={params => (
              <TextField {...params} label="Enter Safe Spot Here"  onChange={handleTextChange} style={{ marginTop: '1rem',width:'100%' }} onSelect={handleTextSelect} />
            )}
          />
					<Button
						variant="contained"
						color="primary"
						style={{ margin: 'auto', marginTop: '1.3rem', width: '200px' }}
						type="submit"
					>
						Submit Response
					</Button>
					<Typography color="error" >
                    <div id="after-submit-2">

                    </div>
                </Typography>
				</FormControl>
			</form>
		</div>
	);
}
