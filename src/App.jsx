import React, {useEffect, useState} from 'react';
import './App.css';
import MiniDrawer from './components/NavBar'
import {Typography,Card,CardContent, Divider} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios'
import NewsCard from './components/NewsCard'


const useStyles = makeStyles({
  card : {
    maxWidth : '580px',
    marginTop : '1rem',
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


function App() {

  const [news,setNews] = useState([])

  useEffect( () => {
    const getNews = async()=>{
      var response = await axios.get('https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=2fcbccc19b4643978c45e3609deb438c')
      setNews(response.data.articles)
    }
    getNews()
  }, []);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="App">
      <MiniDrawer>
        <Card className={classes.card} raised>
        <Typography variant="h3" style={{color : 'white',padding : '1rem 0', background : 'linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224))'}}>
          Latest News
        </Typography>
        <Divider light/>
          <CardContent>
            {news.map(({title,description,url,urlToImage})=>{
             return <NewsCard title={title} description={description} urlToArticle={url} urlToImage={urlToImage} />
            })}
          </CardContent>
        </Card>

      </MiniDrawer>
    </div>
  );
}

export default App;
