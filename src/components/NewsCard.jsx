import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link'

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    margin : '2rem auto',
  },
});

export default function NewsCard({title,description,urlToArticle,urlToImage}) {
  const classes = useStyles();

  return (
    <Link underline="none" href={urlToArticle} target="_blank">
        <Card className={classes.card} variant="outlined" raised={true}>
        <CardActionArea>
            <CardMedia
            component="img"
            alt={title}
            height="240"
            image={urlToImage}
            title={title}
            />
            <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
                {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {description}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Link>
  );
}
