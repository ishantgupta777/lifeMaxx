import React, {useEffect, useState, Fragment} from 'react';
import {Typography,Card,CardContent, Divider, Container} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'
import NewsCard from '../components/NewsCard'
import LiveUpdateForm from '../components/LiveUpdateForm';


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
  mainFragement : {
    display: 'grid',
    gridTemplateColumns : '1fr 1fr',
    gridColumnGap : '4rem',
  }
});


function NewsPage() {

  const [news,setNews] = useState([])
  const [liveNews, setLiveNews] = useState([]);

  useEffect( () => {
    const getNews = async()=>{
      var response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=2fcbccc19b4643978c45e3609deb438c')
      setNews(response.data.articles.slice(0, 10))
      setLiveNews(response.data.articles.slice(11, 18))
    }
    getNews()
  }, []);

  const classes = useStyles();

  return (
    <Container className={classes.mainFragement}>
      <Fragment>
        <Card className={classes.card}>
          <Typography variant="h4" style={{color : 'white',padding : '.7rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
            Latest News
          </Typography>
          <Divider light/>
            <CardContent style={{display:"grid",gridTemplateColumns : '1fr 1fr',gridRowGap : '1.5rem'}} >
              {news.map(({title,description,url,urlToImage})=>{
                if(!urlToImage)
                return null
              return <NewsCard title={title}  description={description} urlToArticle={url} urlToImage={urlToImage} />
              })}
            </CardContent>
        </Card>
      </Fragment>
      <Fragment>
        <LiveUpdateForm news={liveNews} setNews={setLiveNews}/>
      </Fragment>
    </Container>
  );
}

export default NewsPage;
