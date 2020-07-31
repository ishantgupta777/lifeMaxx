import React, {Fragment, useEffect,useState} from 'react';
import {Typography, Divider,TextField,Card,CardContent,IconButton,Avatar} from '@material-ui/core';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import axios from 'axios'
import SafePerson from '../components/SafePerson'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
}));

const SafePeople = () => {

    const [safePeople,setSafePeople] = useState([])
    const [searchField,setSearchField] = useState('')

    useEffect( ()=>{
        const getSafePeople =async ()=>{
            const response = await axios.get('https://lifemaxx.eu-gb.cf.appdomain.cloud/safePeople')
            setSafePeople(response.data)
        }
        getSafePeople()
    },[])

    const handleChange = (e)=>{
        var searchField = e.target.value.substring(0,20)
        // safePeople.filter((person)=>person.name.includes(searchField))
        setSearchField(searchField)
    }

    return (
        <Fragment>
            <Typography variant="h5" style={{padding:'1rem 0',background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))',color : 'white'}}>
                Safe People
            </Typography>
            <Divider style={{marginTop:'1rem'}}/>
            <TextField id="standard-search" label="Search field" type="search" style={{width:'90%',margin :'1rem auto'}} onChange={handleChange} />

            <div className="safe_people_grid" style={{display:'grid',gridTemplateColumns: '1fr 1fr',gridColumnGap:'.7rem',marginTop:'1rem'}}>
                {safePeople.filter((person)=>person.name.toLowerCase().includes(searchField.toLowerCase())).map(person=>{
                    return <SafePerson person={person} key={person._id} />
                })}
            </div>

        </Fragment>
    );
}

export default SafePeople;
