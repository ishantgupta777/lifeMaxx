import React, {useEffect,useState} from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import axios from 'axios'


function LiveUpdates({news, setNews}){
    const [updates,setUpdates] = useState([])

    useEffect(()=>{
        const getUpdates = async ()=>{
            const res = await axios.get('https://lifemaxx.eu-gb.cf.appdomain.cloud/liveUpdate')
            setUpdates(res.data.reverse())
        }
        getUpdates()
    },[])

    return(
         <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gridGap:'1.6rem',padding:'.5rem',background:'#efefef'}}>
            {updates.map(({message,author='NA'})=>{
                return (
                    <Card raised>
                        <CardContent>
                            <Typography variant="body2" style={{textAlign:'left',padding:'.2rem .3rem',fontWeight:'400'}} >
                                {message}
                            </Typography>
                            <Typography variant="body1" style={{textAlign:'right',padding:'.2rem .3rem',fontWeight:'500'}}>
                                ~{author}
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}
         </div>
    )
}

export default LiveUpdates;