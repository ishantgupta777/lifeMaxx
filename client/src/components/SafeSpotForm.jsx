import React, { Fragment } from 'react';
import {Card,CardContent,Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SafeSpotMultiSelectAndInput from '../components/SafeSpotMultiSelectAndInput'

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

    return (
        <Fragment>
            <Card className={classes.card} raised>
                <Typography variant="h4" style={{color : 'white',padding : '.7rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
                    Add a safe spot
                </Typography>
                <CardContent>
                    <SafeSpotMultiSelectAndInput/>
                </CardContent>
            </Card>
        </Fragment>
    );
}

export default SafeSpotForm;
