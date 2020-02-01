import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Card, CardContent, CardActionArea, Divider} from '@material-ui/core';
import {AccountBalance, EmojiFoodBeverageOutlined, Healing, LocalDrink, People, Opacity} from '@material-ui/icons';

const dashboardStyles = makeStyles({
    font : {
        fontFamily : 'Arial',
    },
    dashboardContainer : {
        
    },
    resources : {
        width : '95%',
        margin :  'auto',
        zIndex : '0'
    },
    resourcesInfo : {
        display : 'grid',
        gridTemplateColumns : '1fr 1fr 1fr',
        margin : '0.5rem auto',
        padding : '2rem 1rem',
        gridRowGap : '2rem'
    },
    icon : {
        fontSize : '5rem',
        color : 'white',
    },
    card : {
        width : '80%',
        margin : '0.5rem auto',
        color : 'black',
        height : '350px',
        overflowY : 'scroll',
        scrollbarWidth : 'none',
        zIndex : '2',
    },
    volunteerInfo : {

    },
    divider : {
        border : '5px  solid white'
    },
})

function ResourceCard(props) {
    const classes = dashboardStyles();
    let iconTheme = props.icon;
    return (
        <div>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardContent>
                    <div style={{margin : 'auto', padding : '2rem'}}>
                        <Card raised style={{width : '90%', background : props.color, paddingTop : '1rem', margin : 'auto', zIndex : '2 '}}>
                            {props.children}
                        </Card>
                    </div>
                    <Divider light style={{border : '1px solid black', margin : '1rem auto 0rem auto'}}></Divider>
                    <Typography gutterBottom variant="h4">
                        {props.name}
                    </Typography>
                    <Typography
                        paragraph
                        variant = 'h5' 
                    >
                        Current State : {props.currentState}
                        <br></br>
                        Current Condition :  {props.currentCondition}
                    </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

function Dashboard() {
    const classes = dashboardStyles();

    return(
        <div className={classes.resources}>
            <div>
            <Typography 
                align="left"
                variant="h3"
                style={{padding : '0.5rem 1rem', color : '#4A00E0'}}
            >
                Rescue Centre : Panjim
            </Typography>
            <Divider style={{border : '1px solid #492540', width : '98%', margin : '0rem auto 2rem auto'}} />
            </div>
            <Card style={{color : '#e8ffe8', borderRadius : '10px', backgroundColor : '#efefef'}} raised>
            <Typography 
                className={classes.font}
                align="left"
                variant="h3"
                style={{padding : '0.5rem 1rem', color : '#492540'}}
            >
                Resources
            </Typography>
            <Divider style={{border : '1px solid #492540', width : '98%', margin : 'auto'}} />
            <CardContent className={classes.resourcesInfo}>
                <ResourceCard
                    name={'People'}
                    color={'#086972'}
                    currentState={Math.floor(Math.random() * 1000) + ' People'}
                    currentCondition={'Satisfactory'}
                >
                    <People className={classes.icon} />
                </ResourceCard>
                <ResourceCard  
                    name={'Capital'} 
                    color={'#5d5d5a'} 
                    currentState={Math.floor(Math.random() * 10000)}
                    currentCondition='Satisfactory'>
                    <AccountBalance className={classes.icon}/>
                </ResourceCard>
                <ResourceCard 
                    name={'Food Reserves'} 
                    color={'#FFCC00'}
                    currentState={'9 Days'}
                    currentCondition='Satisfactory'>
                    <EmojiFoodBeverageOutlined className={classes.icon}/>
                </ResourceCard>
                <ResourceCard 
                    name={'Water Reserves'}
                    color={'#1e2a78'}
                    currentState={Math.floor(Math.random() * 10000) + ' Litres'}
                    currentCondition={'Satisfactory'}
                >
                    <Opacity className={classes.icon}/>
                </ResourceCard>
                <ResourceCard  
                    name={'Health Care'} 
                    color={'#F12811'}
                    currentState={'5 Medical Personnel'}
                    currentCondition='Satisfactory'>
                    <Healing className={classes.icon}/>
                </ResourceCard>
                <ResourceCard 
                    name={'Sanitation'} 
                    color={'#4B01E0'}
                    currentState={'6 Bathrooms'}
                    currentCondition={'Satisfactory'}
                    >
                    <LocalDrink className={classes.icon} />
                </ResourceCard>
                </CardContent>
                </Card>
        </div>
    );
}

export default Dashboard;