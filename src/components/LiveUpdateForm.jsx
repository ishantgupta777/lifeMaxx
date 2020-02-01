import React from 'react';
import { TextField, Button, Typography, Divider, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

const sectionStyles = makeStyles({
    liveUpdatesContainer : {
    },
    liveUpdates : {
        maxHeight : '80vh',
        overflowY : 'scroll',
        scrollbarWidth : 'none',
    },
    headlineCard : {
        width : '80%',
        margin : '1.5rem auto',
        padding : '0.5rem',
        backgroundColor : '#faee5a  '
    },
    addUpdate : {
        width : '100%',
        margin : '1rem auto',
    },
    addUpdateButton : {
        width : '70%',
        margin : '1rem auto'
    },
    updateForm : {
        display : "none",
        margin : '1rem auto'
    },
    root: {
        width : '95%',
        margin : 'auto',
        paddingBottom : '1.5rem'
    },
})

const showUpdateForm = () => {
    document.querySelector("#addUpdBut").style.display = "none";
    document.querySelector("#updFormDiv").style.display = "block";
}

// const onSubmit = (data) => {
//     let formData = new FormData();
//     formData.append('title', data.title);
// }

function LiveUpdateForm({news, setNews}){
    const classes = sectionStyles();
    const {handleSubmit} = useForm();

    return(
        <div className={classes.liveUpdatesContainer}>
         <div className={classes.liveUpdates}>
            <Card className={classes.card} >
            <Typography variant="h4" style={{color : 'white',padding : '.7rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
                Live Updates
            </Typography>
            <Divider light/>
                <CardContent style={{}} >
                    {news.map(({title})=>{
                        return (
                            <Card className={classes.headlineCard}>
                                <Typography>
                                    {title}
                                </Typography>
                            </Card>
                        );
                    })}
                </CardContent>
            </Card>
         </div>
         <div id="addUpdBut" className={classes.addUpdate}>
                <Button 
                    className={classes.addUpdateButton} 
                    variant="contained" 
                    color="primary" 
                    component="label" 
                    onClick={showUpdateForm}>

                    Add Update
                </Button>
         </div>
         <div id="updFormDiv" className={classes.updateForm}>
         <Card 
            raised
            style={{margin : '2rem auto'}}>
            <Typography 
                variant="h5"
				style={{
					padding: '1rem 0',
					background: 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))',
					color: 'white',
				}}
                >
                    Add Update
            </Typography>
            <Divider style={{ marginTop: '1rem' }} />
            <form className = {classes.root} 
                onSubmit = {handleSubmit( data => {
                    data.title = data.title + data.Location;

                    // Send data to live updates database

                })}>
                <TextField
                    label="Description of Situation"
                    name="title"
                    required
                    style={{margin : 'auto', width : '95%'}}
                >
                </TextField>

                <br></br>

                <TextField
                    label = "Location"
                    name = "Location"
                    requiured
                    style={{margin : 'auto', width : '95%'}}
                >
                </TextField>

                <Divider light />


                <Button variant="contained" color="primary" style={{ marginTop: '1rem' }} type="submit">
						Submit
				</Button>

            </form> 
            </Card>
         </div>
        </div>
    )
}

export default LiveUpdateForm;