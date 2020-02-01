import React, {useState, useEffect, Fragment} from 'react';
import {Typography, Card,CardContent,IconButton,Avatar} from '@material-ui/core';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import axios from 'axios';

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

const Volunteer = ({person}) => {
    const classes = useStyles();

    return (
        <Fragment>
            <Card className={classes.card} raised style={{marginBottom:'.7rem',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {person.name.substring(0,15)}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        Age:{person.age} <br/>  Mobile : {person.number}
                    </Typography>
                    </CardContent>
                </div>
                <Avatar alt={person.name} src={person.image} className={classes.large} />
            </Card>
        </Fragment>
    );
}

const VolunteerList = ({props}) => {
  const [safePeople,setSafePeople] = useState([])
  
  useEffect( ()=>{
    const getSafePeople =async ()=>{
        const response = await axios.get('https://lifemaxx.herokuapp.com/safePeople')
        setSafePeople(response.data)
    }
    getSafePeople()
  },[])

  return(
    <div>
      {safePeople.map((person) => {
          return(
            <Volunteer person = {{
              name: person.name,
              age : person.age,
              image : person.image,
              number : (Math.floor(Math.random() * 10) + 1) + Math.random().toString().slice(2, 10) 
            }}
            />
          );
        })
      }
   </div>

  );
}

export default VolunteerList;