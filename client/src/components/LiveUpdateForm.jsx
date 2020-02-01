import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';


function LiveUpdateForm({news, setNews}){
    return(
         <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gridGap:'1.6rem',padding:'.5rem',background:'#efefef'}}>
            {news.map(({title,author='NA'})=>{
                return (
                    <Card raised>
                        <CardContent>
                            <Typography variant="body2" style={{textAlign:'left',padding:'.2rem .3rem',fontWeight:'400'}} >
                                {title}
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

export default LiveUpdateForm;