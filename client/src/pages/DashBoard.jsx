import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Card, CardContent, CardActionArea, Divider} from '@material-ui/core';
import {AccountBalance, EmojiFoodBeverageOutlined, Healing, LocalDrink, People, Opacity} from '@material-ui/icons';

const dashboardStyles = makeStyles({
    resources : {
        margin :  'auto',
        zIndex : '0'
    },
    resourcesInfo : {
        display : 'grid',
        gridTemplateColumns : '1fr 1fr 1fr',
        margin : '0.5rem auto',
        padding : '2rem 0rem',
        gridRowGap : '1rem'
    },
    icon : {
        fontSize : '5rem',
        color : 'white',
    },
    card : {
        width : '85%',
        margin : '0.5rem auto',
        height : '300px',
        overflowY : 'hidden',
        zIndex : '2',
    },
    divider : {
        border : '5px  solid white'
    },
})

function ResourceCard(props) {
    const classes = dashboardStyles();
    return (
        <div>
            <Card className={classes.card} raised>
                <CardActionArea>
                    <CardContent>
                    <div style={{margin : 'auto', padding : '.5rem'}}>
                        <Card raised style={{width : '90%', background : props.color, padding : '1rem 0', margin : 'auto', zIndex : '2 '}}>
                            {props.children}
                        </Card>
                    </div>
                    <Typography gutterBottom variant="h5" style={{fontWeight:'bold',marginTop:'1rem'}}>
                        {props.name}
                    </Typography>
                    <Typography
                        paragraph
                        variant = 'h6' 
                        style={{fontWeight:'normal'}}
                    >
                        Current State : <span style={{fontSize:'700'}} >{props.currentState}</span>
                        <br></br>
                        Current Condition :  <span>{props.currentCondition}</span>
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
            <div style={{marginBottom:'1rem'}}>
            <Typography variant="h4" style={{color : 'white',padding : '.7rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
                Rescue Center : Panjim
            </Typography>
            </div>
            <Card style={{color : '#e8ffe8', borderRadius : '10px', backgroundColor : '#efefef'}} raised>
            <CardContent className={classes.resourcesInfo}>
                <ResourceCard
                    name={'People'}
                    color={'#086972'}
                    currentState={Math.floor(Math.random() * 1000) + 'People'}
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
                    currentState={'Medical Personnel'}
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