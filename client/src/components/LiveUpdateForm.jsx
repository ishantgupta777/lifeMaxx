import React, { Fragment } from 'react';
import {Card,CardContent,Typography,TextField,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(theme=>({
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
        },
      },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
}))

const SafeSpotForm = () => {
    const classes = useStyles();

    const handleSubmit =async (e)=>{
      document.getElementById('after-submit').innerText = "Submitted"
        e.preventDefault()
        const message = document.getElementById('live-update').value
        const author = document.getElementById('live-update-author').value
        if(!message)
        return
        const response = await axios.post('https://lifemaxx.eu-gb.cf.appdomain.cloud/liveUpdate',{
            message,
            author
        })
    }

    return (
        <Fragment>
            <Card className={classes.card} raised>
                <Typography variant="h4" style={{color : 'white',padding : '.7rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
                    Add a live update
                </Typography>
                <CardContent>
                <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
                    <TextField id="live-update" label="Enter Update" fullWidth style={{width:'80%'}} />
                    <TextField id="live-update-author" label="Your Name" fullWidth  style={{width:'80%'}} />
                    <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} type="submit">
                    Submit Response
                  </Button>
                </form>
                <Typography color="error" >
                    <div id="after-submit">

                    </div>
                </Typography>
                </CardContent>
            </Card>
        </Fragment>
    );
}

export default SafeSpotForm;
