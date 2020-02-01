import React, { Fragment } from 'react';
import SafeSpotForm from '../components/SafeSpotForm'
import LiveUpdateForm from '../components/LiveUpdateForm'

const HelpOthers = () => {
    return (
        <div style={{display:'grid',gridGap:'3rem',gridTemplateColumns:'1fr 1fr',padding:'2rem',width:'100%',margin:'auto'}}>
            <SafeSpotForm/>
            <LiveUpdateForm/>
        </div>
    );
}

export default HelpOthers;
