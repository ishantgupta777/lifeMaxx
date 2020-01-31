import React, {Fragment} from 'react';
import {Typography, Card,CardContent,IconButton,Avatar} from '@material-ui/core';
import { makeStyles,useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
      large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      card: {
        display: 'flex',
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        width: 151,
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
      playIcon: {
        height: 38,
        width: 38,
      },
}));

const SafePerson = ({person}) => {
    const {image,name,age,rescueCentre} = person
    const classes = useStyles();

    return (
        <Fragment>
            <Card className={classes.card} raised style={{marginBottom:'.7rem',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {name.substring(0,15)}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Age:{age} <br/>  RescueCentre:{rescueCentre}
                    </Typography>
                    </CardContent>
                </div>
                <Avatar alt={name} src={image} className={classes.large} />
            </Card>
        </Fragment>
    );
}

export default SafePerson;
