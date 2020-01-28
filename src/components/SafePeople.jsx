import React, {Fragment, useEffect} from 'react';
import {Typography, Divider,TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
}));

const SafePeople = () => {
    const classes = useStyles();

    useEffect( ()=>{
        // const getSafePeople =async ()=>{
        //     const response = await axios.get('/safepersons')
        //     console.log(response)
        // }
        // getSafePeople()
    },[])

    return (
        <Fragment>
            <Typography variant="h5" style={{padding:'1rem 0',background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))',color : 'white'}}>
                Safe People
            </Typography>
            <Divider style={{marginTop:'1rem'}}/>
            <TextField id="standard-search" label="Search field" type="search" style={{width:'90%',margin :'1rem auto'}} />



        </Fragment>
    );
}

export default SafePeople;
