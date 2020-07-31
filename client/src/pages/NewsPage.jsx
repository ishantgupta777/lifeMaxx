import React, {useEffect, useState, Fragment} from 'react';
import {Typography,Card,CardContent, Divider} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'
import NewsCard from '../components/NewsCard'
import LiveUpdates from '../components/LiveUpdates'


const useStyles = makeStyles({
  card : {
    maxWidth : '620px',
    marginTop : '.3rem',
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
});


function NewsPage() {

  const [news,setNews] = useState([])

  useEffect( () => {
    const getNews = async()=>{
      var response = await axios.get('https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=health&apiKey=2fcbccc19b4643978c45e3609deb438c')
      setNews(response.data.articles)
    }
    getNews()
  }, []);

  const classes = useStyles();

  return (
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gridGap:'2rem'}}>
        <Card className={classes.card} raised >
        <Typography variant="h4" style={{color : 'white',padding : '.7rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
          Latest News
        </Typography>
          <CardContent style={{display:"grid",gridTemplateColumns : '1fr 1fr',gridRowGap : '1.5rem',background:'#efefef'}} >
            {news.map(({title,description,url,urlToImage})=>{
              if(!urlToImage)
              return null
             return <NewsCard title={title}  description={description} urlToArticle={url} urlToImage={urlToImage} />
            })}
          </CardContent>
        </Card>
        <Card   className={classes.card} raised >
        <Typography variant="h4" style={{color : 'white',padding : '.7rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
                Live Updates
            </Typography>
          <CardContent style={{background:'#efefef',height:'100%'}} >  
            <LiveUpdates news={news} />
          </CardContent>
        </Card>
    </div>
  );
}

export default NewsPage;
